const users = require("../models/users.js");
const { sendJsonResponse, sendEmail } = require("../utils/helpers.js");

const createClient = async (request, response) => {
	const payload = request.body;
	const { userID: authenticatingUserID } = request.jwtPayload;
	const originUrl = request.headers.origin;

	if (!payload?.email) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
	}

	try {
		const dbUser = await users.findOne({ email: payload.email });
		const dbClient = await users.findOne({ "therapist.invites.email": payload.email });

		if (dbClient) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.CONFLICT, false, "Already In Therapist's List!", null);
		}

		if (dbUser) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.CONFLICT, false, "This User Already Exists!", null);
		}

		const updateResult = await users.findOneAndUpdate(
			{ _id: authenticatingUserID },
			{ $push: { "therapist.invites": { ...payload } } },
			{ new: true }
		);

		if (!updateResult) {
			return sendJsonResponse(
				response,
				HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
				false,
				"Failed to update therapist's client list",
				null
			);
		}

		const emailReplacements = {
			subject: "Joining Invitation",
			setPasswordLink: `${originUrl}/register?email=${payload?.email}&firstName=${payload?.about?.firstName}&lastName=${payload?.about?.lastName}&invitedBy=${authenticatingUserID}`,
			TherapistName: `${updateResult?.about.firstName} ${updateResult?.about.lastName}`,
		};

		const emailSent = await sendEmail(payload.email, emailReplacements, "therapistInvitation.html");

		if (emailSent) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Created And Email Sent::Success", emailSent);
		} else {
			return sendJsonResponse(
				response,
				HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
				false,
				"Created But Email Sent::Failure",
				null
			);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", {
			error: error?.message || error,
		});
	}
};

const removeClient = async (request, response) => {
	const { _id: clientID, email: clientEmail } = request.query;
	const { userID: authenticatingUserID } = request.jwtPayload;

	if (!clientID) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
	}

	try {
		const authenticatingDBUser = await users.findOne({ _id: authenticatingUserID });
		if (authenticatingDBUser) {
			if (authenticatingDBUser.userRole !== "therapist") {
				return sendJsonResponse(response, HTTP_STATUS_CODES.FORBIDDEN, false, "Unauthorized access!", null);
			}
			const isClientInvited = authenticatingDBUser?.therapist?.invites?.some((invite) => invite?.email === clientEmail);
			const isClientExists = authenticatingDBUser?.therapist?.clients?.some(
				(client) => client?.clientID.toString() === clientID
			);

			if (isClientInvited) {
				const removeInvitedUser = await users.findOneAndUpdate(
					{ _id: authenticatingUserID },
					{
						$pull: {
							"therapist.invites": { email: clientEmail },
						},
					},
					{ new: true }
				);

				if (removeInvitedUser) {
					return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Client removed successfully", removeInvitedUser);
				} else {
					return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Client removal failed", null);
				}
			}

			if (isClientExists) {
				const removeUser = await users.findOneAndUpdate(
					{ _id: authenticatingUserID },
					{
						$pull: {
							"therapist.clients": { clientID: clientID },
						},
					},
					{ new: true }
				);

				if (removeUser) {
					return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Client removed successfully", removeUser);
				} else {
					return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Client removal failed", null);
				}
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Client not found in therapist's list", null);
			}
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Authenticating user not found", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", {
			error: error?.message || error,
		});
	}
};

module.exports = {
	createClient,
	removeClient,
};
