const users = require("../models/users.js");
const appointments = require("../models/appointments.js");

const getAppointments = async (request, response) => {};

const createAppointment = async (request, response) => {
	try {
		const payload = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;
		if (!payload.userID || !payload.schedule.date) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const authenticatingDBUser = await users.findOne({ _id: authenticatingUserID });


		if (payload?.userID === authenticatingUserID || authenticatingDBUser?.userRole === "admin") {
			const eventBooking = new appointments({
				...payload,
				createdBy: authenticatingUserID,
				updatedBy: authenticatingUserID,
			});

			const newEventBooking = await eventBooking.save();

			if (newEventBooking) {
				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Record created::success", newEventBooking);
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


const updateAppointment = async (request, response) => {};
const deleteAppointment = async (request, response) => {};

module.exports = {
	getAppointments,
	createAppointment,
	updateAppointment,
	deleteAppointment,
};
