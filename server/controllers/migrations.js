const bcrypt = require("bcrypt");
const users = require("../models/users");
const usersJsonData = require("../utils/migrations/users.json");
const { sendJsonResponse } = require("../utils/helpers");

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const directoriesToCreateInAssets = ["./assets/encryptionKeys", "./assets/images/users"];

const generateAndSaveRSAKeys = async () => {
	const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
		modulusLength: 2048,
		publicKeyEncoding: { type: "spki", format: "pem" },
		privateKeyEncoding: { type: "pkcs8", format: "pem" },
	});

	const encryptionKeysPath = "./assets/encryptionKeys";

	fs.writeFileSync(path.join(encryptionKeysPath, "privateKey.key"), privateKey);
	fs.writeFileSync(path.join(encryptionKeysPath, "publicKey.key"), publicKey);
};

const installSampleDB = async (request, response) => {
	let successMessage = {};

	try {
		// Step 1: Create assets directories
		for (let directory of directoriesToCreateInAssets) {
			fs.mkdirSync(directory, { recursive: true });

			// Step 1: Generate RSA Keys
			try {
				await generateAndSaveRSAKeys();
				successMessage.rsa = "RSA Keys Generated::Success";
			} catch (rsaError) {
				throw new Error(`RSA Key Generation Failed: ${rsaError.message}`);
			}
		}

		// Step 2: Create users
		for (const user of usersJsonData) {
			user.password = await bcrypt.hash(user.password, 12);
			await users.create(user);
		}
		successMessage.users = "Users Created::Success";

		// Successfully completed all steps
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, successMessage, null);
	} catch (error) {
		// Handle any error that occurred in the above steps
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", {
			error: error.message || error,
		});
	}
};

module.exports = {
	installSampleDB,
};
