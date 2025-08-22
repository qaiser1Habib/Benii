const users = require("../models/users.js");
const services = require("../models/services.js");
const { sendJsonResponse } = require("../utils/helpers.js");

const getServices = async (request, response) => {
	const { therapistID } = request.query;
	const { userID: authenticatingUserID } = request.jwtPayload;
	const authenticatingDBUser = await users.findOne({ _id: authenticatingUserID });
	try {
		let userServices;

		if (authenticatingDBUser?.userRole === "admin") {
			userServices = await services.find().populate("therapistID", "about.firstName about.lastName");
		} else if (therapistID === authenticatingUserID && authenticatingDBUser?.userRole === "therapist") {
			userServices = await services
				.find({ therapistID: authenticatingDBUser._id })
				.populate("therapistID", "about.firstName about.lastName");
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.FORBIDDEN, false, "Unauthorized access.");
		}
		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Services fetched successfully.", userServices);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const createService = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!payload.therapistID || !payload?.title) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const authenticatingDBUser = await users.findOne({ _id: authenticatingUserID });

		if (payload?.therapistID === authenticatingUserID || authenticatingDBUser?.userRole === "admin") {
			const service = new services({
				...payload,
				createdBy: authenticatingUserID,
				updatedBy: authenticatingUserID,
			});

			const newService = await service.save();

			if (newService) {
				await users.findByIdAndUpdate(
					payload.therapistID,
					{ $push: { "therapist.services": newService._id } },
					{ new: true }
				);

				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Record created::success", newService);
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Record created::failure", null);
			}
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Permission denied!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const updateService = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!payload?._id || !payload.title) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const authenticatingDBUser = await users.findOne({ _id: authenticatingUserID });

		const existingService = await services.findOne({ _id: payload._id });

		if (!existingService) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Service not found!", null);
		}
		if (authenticatingDBUser?.userRole === "therapist" || authenticatingDBUser?.userRole === "admin") {
			const updatedService = await services.findByIdAndUpdate(
				payload._id,
				{
					...payload,
					updatedBy: authenticatingUserID,
				},
				{ new: true }
			);

			if (updatedService) {
				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Record updated::success", updatedService);
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Record update::failure", null);
			}
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Permission denied!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

const deleteService = async (request, response) => {
	try {
		const { _id: deleteItemID } = request.query;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!deleteItemID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const authenticatingDBUser = await users.findOne({ _id: authenticatingUserID });

		if (authenticatingDBUser?.userRole === "therapist" || authenticatingDBUser?.userRole === "admin") {
			const deletedService = await services.findByIdAndDelete(deleteItemID);

			if (deletedService) {
				await users.findByIdAndUpdate(
					authenticatingDBUser._id,
					{ $pull: { "therapist.services": deleteItemID } },
					{ new: true }
				);

				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Service deleted successfully", deletedService);
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Service not found", null);
			}
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Permission denied!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error!", {
			error: error?.message || error,
		});
	}
};

module.exports = {
	getServices,
	createService,
	updateService,
	deleteService,
};
