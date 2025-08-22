const { sendJsonResponse, optimizeAndConvertImage, generateUniqueFilename } = require("../utils/helpers.js");
const questions = require("../models/questions.js");
const users = require("../models/users.js");

const getQuestions = async (request, response) => {
	try {
		const { _id: itemID, page, limit, count } = request.query;

		if (count === "true") {
			const totalRecords = await questions.countDocuments({});
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Total Questions!", { total: totalRecords });
		}

		if (!itemID && (!page || !limit)) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const dbPayload = await questions
			.find(itemID ? { _id: itemID } : {})
			.limit(limit)
			.skip(page && (page - 1) * limit);

		if (dbPayload.length > 0) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Questions Found!", itemID ? dbPayload[0] : dbPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOTFOUND, false, "Questions not Found!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const createQuestion = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!payload?.question || !payload?.type) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const dbUser = await users.findById(authenticatingUserID);

		if (!dbUser) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "User not found!", null);
		}

		if (dbUser.userRole === "admin") {
			const questionToSave = new questions({
				...payload,
			});

			const newQuestion = await questionToSave.save();

			return sendJsonResponse(response, HTTP_STATUS_CODES.CREATED, true, "Question created successfully", newQuestion);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.FORBIDDEN, false, "Unauthorized access!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "An error occurred", {
			error: error?.message || error,
		});
	}
};

const updateQuestion = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!payload._id) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing question ID!", null);
		}

		const existingQuestion = await questions.findById(payload._id);
		if (!existingQuestion) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Question not found!", null);
		}

		const dbUser = await users.findOne({ _id: authenticatingUserID });
		if (dbUser.userRole !== "admin") {
			return sendJsonResponse(response, HTTP_STATUS_CODES.FORBIDDEN, false, "Unauthorized access!", null);
		}

		const updatedQuestion = await questions.findByIdAndUpdate(
			payload._id,
			{ ...payload, updatedBy: authenticatingUserID },
			{ new: true, runValidators: true }
		);

		if (updatedQuestion) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Question updated successfully", updatedQuestion);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Question update failed", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "An error occurred", {
			error: error?.message || error,
		});
	}
};

const deleteQuestion = async (request, response) => {
	try {
		const { _id: deleteItemID } = request.query;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!deleteItemID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}
		const existingQuestion = await questions.findById(deleteItemID);
		if (!existingQuestion) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Question not found!", null);
		}

		const dbUser = await users.findOne({ _id: authenticatingUserID });
		if (dbUser.userRole !== "admin") {
			return sendJsonResponse(response, HTTP_STATUS_CODES.FORBIDDEN, false, "Unauthorized access!", null);
		}

		const deletedDBPayload = await questions.findOneAndDelete({ _id: deleteItemID }, { new: true });

		if (deletedDBPayload) {
			await users.updateMany({}, { $pull: { clientAdditionalDetail: { questionID: deleteItemID } } });
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Question  delete::success", deletedDBPayload);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Question  delete::failure", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

module.exports = {
	getQuestions,
	createQuestion,
	updateQuestion,
	deleteQuestion,
};
