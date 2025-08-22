const { sendJsonResponse, optimizeAndConvertImage, generateUniqueFilename } = require("../utils/helpers.js");
const blogs = require("../models/blogs.js");

const path = require("path");
const fs = require("fs");

const mediaFilePath = path.join(__dirname, "../assets");

const getBlogs = async (request, response) => {
	try {
		const { _id: itemID, page, limit, count } = request.query;

		if (count === "true") {
			const totalRecords = await blogs.countDocuments({});
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Total Blogs!", { total: totalRecords });
		}

		if (!itemID && (!page || !limit)) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const dbPayload = await blogs
			.find(itemID ? { _id: itemID } : {})
			.limit(limit)
			.skip(page && (page - 1) * limit);

		if (dbPayload.length > 0) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Blog Found!", itemID ? dbPayload[0] : dbPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "Blog not Found!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const createBlog = async (request, response) => {
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

		const payloadToSaveInDB = new blogs({
			...payload,
			createdBy: authenticatingUserID,
			updatedBy: authenticatingUserID,
		});
		const newDBPayload = await payloadToSaveInDB.save();

		if (newDBPayload) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Blog created::success", newDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Blog created::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const updateBlog = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;
		const files = request.files;

		if (!payload._id) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const prevDBRecord = await blogs.findOne({ _id: payload._id });

		if (files?.length > 0) {
			let file = files[0];
			let filePathByMediaSize = path.join(mediaFilePath, file.mimetype.startsWith("video") ? "videos" : "images");

			if (file.mimetype.startsWith("image")) file = await optimizeAndConvertImage(file, "webp", 90);

			const generatedFileName = generateUniqueFilename(file, filePathByMediaSize);
			const fileFullPath = path.join(filePathByMediaSize, generatedFileName);

			await fs.promises.writeFile(fileFullPath, file.buffer);
			payload.media = { mimetype: file.mimetype, filename: generatedFileName };
		}

		const updatedDBPayload = await blogs.findOneAndUpdate(
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

			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Blog updated::success", updatedDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Blog updated::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const deleteBlog = async (request, response) => {
	try {
		const { _id: deleteItemID } = request.query;

		if (!deleteItemID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const deletedDBPayload = await blogs.findOneAndDelete({ _id: deleteItemID }, { new: true });

		if (deletedDBPayload) {
			if (deletedDBPayload?.media?.filename) {
				const existingFilePath = path.join(
					mediaFilePath,
					deletedDBPayload.media.mimetype.startsWith("video") ? "videos" : "images",
					deletedDBPayload.media.filename
				);
				if (fs.existsSync(existingFilePath)) await fs.promises.unlink(existingFilePath);
			}

			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Blog delete::success", deletedDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Blog delete::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

module.exports = {
	getBlogs,
	createBlog,
	updateBlog,
	deleteBlog,
};
