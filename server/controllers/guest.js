const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { sendJsonResponse } = require("../utils/helpers");

const placeholderImage = path.join(__dirname, "../assets/placeholders/square-banner.webp");
const mediaFilePath = path.join(__dirname, "../assets");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);

const getMedia = async (request, response) => {
	try {
		const { filename, width, mimetype } = request.query;

		if (!filename || !mimetype) {
			const sourceFile = await readFileAsync(placeholderImage);
			response.writeHead(200, {
				"Content-Type": "image/webp", // Adjust the MIME type if your placeholder image is not webp
				"Content-Length": sourceFile.length,
				"Cache-Control": "public, max-age=31536000",
			});
			return response.end(sourceFile);
		}

		const fileFullPath = path.join(mediaFilePath, mimetype.startsWith("video") ? "videos" : "images", filename);
		const isFileExists = fs.existsSync(fileFullPath);

		// Read the file asynchronously
		let contentBuffer;
		if (mimetype.startsWith("image")) {
			// For images, optionally resize based on the provided width
			const sourceFile = await readFileAsync(isFileExists ? fileFullPath : placeholderImage);
			contentBuffer = width ? await sharp(sourceFile).resize(parseInt(width)).toBuffer() : sourceFile;
		} else {
			// For videos, simply read the file
			contentBuffer = await readFileAsync(isFileExists ? fileFullPath : placeholderImage);
		}

		response.writeHead(200, {
			"Content-Type": mimetype,
			"Accept-Ranges": "bytes", // Enable support for Range requests for videos
			"Content-Length": contentBuffer.length, // Set the content length
			"Cache-Control": "public, max-age=31536000", // Cache the content for performance
		});

		response.end(contentBuffer);
	} catch (error) {
		if (!response.headersSent) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", error);
		} else {
			console.error("Error after headers sent:", error);
		}
	}
};

module.exports = { getMedia };
