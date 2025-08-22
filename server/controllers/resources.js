const { sendJsonResponse, optimizeAndConvertImage, generateUniqueFilename } = require("../utils/helpers.js");
const resources = require("../models/resources.js");

const path = require("path");
const fs = require("fs");

const mediaFilePath = path.join(__dirname, "../assets");

const getResources = async (request, response) => {
	try {
		const { _id: itemID, page, limit, count } = request.query;

		if (count === "true") {
			const totalRecords = await resources.countDocuments({});
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Total Resources!", { total: totalRecords });
		}

		if (!itemID && (!page || !limit)) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const dbPayload = await resources
			.find(itemID ? { _id: itemID } : {})
			.limit(limit)
			.skip(page && (page - 1) * limit);

		if (dbPayload.length > 0) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Resource Found!", itemID ? dbPayload[0] : dbPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "Resource not Found!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const createResource = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;
		const files = request.files;

		if (!payload?.title) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		if (files?.length > 0) {
			let file = files[0];
			let filePathByMediaSize = path.join(mediaFilePath, file.mimetype.startsWith("video") ? "videos" : "images");

			if (file.mimetype.startsWith("image")) file = await optimizeAndConvertImage(file, "webp", 90);

			const generatedFileName = generateUniqueFilename(file, filePathByMediaSize);
			const fileFullPath = path.join(filePathByMediaSize, generatedFileName);

			await fs.promises.writeFile(fileFullPath, file.buffer);
			payload.media = { mimetype: file.mimetype, filename: generatedFileName };
		}

		const payloadToSaveInDB = new resources({
			...payload,
			createdBy: authenticatingUserID,
			updatedBy: authenticatingUserID,
		});
		const newDBPayload = await payloadToSaveInDB.save();

		if (newDBPayload) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Resource created::success", newDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Resource created::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const updateResource = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;
		const files = request.files;

		if (!payload._id) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const prevDBRecord = await resources.findOne({ _id: payload._id });

		if (files?.length > 0) {
			let file = files[0];
			let filePathByMediaSize = path.join(mediaFilePath, file.mimetype.startsWith("video") ? "videos" : "images");

			if (file.mimetype.startsWith("image")) file = await optimizeAndConvertImage(file, "webp", 90);

			const generatedFileName = generateUniqueFilename(file, filePathByMediaSize);
			const fileFullPath = path.join(filePathByMediaSize, generatedFileName);

			await fs.promises.writeFile(fileFullPath, file.buffer);
			payload.media = { mimetype: file.mimetype, filename: generatedFileName };
		}

		const updatedDBPayload = await resources.findOneAndUpdate(
			{ _id: payload._id },
			{ $set: { ...payload, updatedBy: authenticatingUserID } },
			{ new: true }
		);

		if (updatedDBPayload) {
			if (files?.length > 0) {
				if (prevDBRecord?.media?.filename) {
					const existingFilePath = path.join(
						mediaFilePath,
						prevDBRecord.media.mimetype.startsWith("video") ? "videos" : "images",
						prevDBRecord.media.filename
					);
					if (fs.existsSync(existingFilePath)) await fs.promises.unlink(existingFilePath);
				}
			}

			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Resource updated::success", updatedDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Resource updated::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const deleteResource = async (request, response) => {
	try {
		const { _id: deleteItemID } = request.query;

		if (!deleteItemID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const deletedDBPayload = await resources.findOneAndDelete({ _id: deleteItemID }, { new: true });

		if (deletedDBPayload) {
			if (deletedDBPayload?.media?.filename) {
				const existingFilePath = path.join(
					mediaFilePath,
					deletedDBPayload.media.mimetype.startsWith("video") ? "videos" : "images",
					deletedDBPayload.media.filename
				);
				if (fs.existsSync(existingFilePath)) await fs.promises.unlink(existingFilePath);
			}

			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Resource delete::success", deletedDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Resource delete::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

module.exports = {
	getResources,
	createResource,
	updateResource,
	deleteResource,
};
