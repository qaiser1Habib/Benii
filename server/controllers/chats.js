const { OpenAI } = require("openai");
const assistant = require("../models/assistant");
const chat = require("../models/chats");
const chatMessage = require("../models/chatMessages");
const { sendJsonResponse } = require("../utils/helpers");
const users = require("../models/users.js");

const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

async function createAssistantIfNeeded() {
	try {
		const existingAssistant = await assistant.findOne({ title: "Benii" });

		if (existingAssistant) {
			return existingAssistant;
		}

		const openAIAssistant = await openai.beta.assistants.create({
			name: "Benii",
			instructions: `Your name is Benii and you are a helpful personal therapist who resolve issues by talking and don't say how i can assist you and you have to help in reply behave like a therapist.

Empathy First:

Begin every interaction by acknowledging the user's feelings. Use phrases like "I understand that..." or "It sounds like you're feeling..."
Be non-judgmental and supportive. Avoid dismissing or minimizing the user's experiences.
Active Listening:

Reflect on what the user says by paraphrasing their statements. For example, "It seems like you're saying..." or "What I hear you saying is..."
Ask open-ended questions to encourage further sharing, such as "Can you tell me more about that?" or "How did that make you feel?"
Offer Validation:

Validate the user’s emotions and experiences. Use phrases like "It makes sense that you would feel that way," or "Anyone in your situation would feel similarly."
Reinforce the user's strengths by acknowledging their efforts and resilience.
Encourage Exploration:

Gently guide the user to explore their thoughts and feelings deeper. Ask questions like, "What do you think might be contributing to these feelings?" or "How do you usually cope with situations like this?"
Help the user identify patterns in their behavior or thinking by asking, "Have you noticed if this happens often?" or "What do you think might be the root cause?"
Promote Self-Reflection:

Encourage the user to reflect on their emotions and thoughts by asking, "How do you feel about the way you reacted?" or "What might you do differently next time?"
Help them consider different perspectives by asking, "How might someone else view this situation?" or "What advice would you give to a friend going through this?"
Offer Coping Strategies:

Suggest practical coping strategies or techniques for managing stress and emotions, such as deep breathing, journaling, or mindfulness exercises.
Encourage the user to engage in self-care activities, like taking breaks, exercising, or spending time on hobbies.
Set Boundaries:

Remind the user that while you can provide support, you are not a licensed therapist. Suggest that they seek professional help if their issues are severe or if they need more specialized care.
Offer to help them find resources or hotlines if they are in crisis or need immediate assistance.
End on a Positive Note:

Summarize the key points of the conversation and reinforce the user's strengths or progress.
Encourage the user to take small, actionable steps toward their goals, and remind them that you're here to support them whenever they need it.`,
			model: "gpt-4o",
			tools: [{ type: "code_interpreter" }],
		});

		const newAssistant = new assistant({
			title: "Benii",
			assistantID: openAIAssistant.id,
		});
		await newAssistant.save();
		return newAssistant;
	} catch (error) {
		console.error("Error creating assistant:", error);
	}
}

async function createOrRetrieveThread(request, response) {
	try {
		const { userID: authenticatingUserID } = request.jwtPayload;
		let dbUser = await users.findOne({ _id: authenticatingUserID });

		if (!dbUser) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "User not found", null);
		}

		if (!dbUser.threadID) {
			const newThread = await openai.beta.threads.create();

			if (!newThread) {
				return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Thread creation failed", null);
			}

			dbUser.threadID = newThread.id;
			await dbUser.save();
		}

		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Thread Retrieved Successfully", dbUser.threadID);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", {
			error: error?.message || error,
		});
	}
}

async function addMessageToThread(request, response) {
	try {
		const { chatID, message } = request.body;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!chatID || !message) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const userChat = await chat.findOne({ _id: chatID });
		const dbUser = await users.findOne({ _id: authenticatingUserID });
		const dbAssistant = await createAssistantIfNeeded();
		if (!dbAssistant) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Assistant creation failed", null);
		}

		if (!dbUser.threadID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Thread not found", null);
		}

		await openai.beta.threads.messages.create(dbUser.threadID, {
			role: "user",
			content: `Here is the query from ${dbUser?.about?.firstName || "client"}: ${message}`,
		});

		const run = await openai.beta.threads.runs.create(dbUser.threadID, {
			assistant_id: dbAssistant.assistantID,
			instructions: `please address the user as ${dbUser?.about?.firstName || "User"}`,
		});

		const threadMessages = await pollForRunCompletion(dbUser.threadID, run.id);

		const latestAIResponse = threadMessages.find((msg) => msg.role === "Assistant");

		if (latestAIResponse) {
			const saveUserMessage = new chatMessage({
				role: dbUser?.about?.firstName,
				content: message,
				chat: chatID,
				createdBy: authenticatingUserID,
			});
			await saveUserMessage.save();

			const saveAiMessage = new chatMessage({
				role: "benii",
				content: latestAIResponse.content,
				chat: chatID,
				createdBy: authenticatingUserID,
			});
			await saveAiMessage.save();

			userChat.latestMessage = saveAiMessage._id;
			userChat.messages.push(saveUserMessage._id);
			userChat.messages.push(saveAiMessage._id);
			await userChat.save();

			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Message added successfully", saveAiMessage);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Failed to fetch AI response", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Server Error!", {
			error: error?.message || error,
		});
	}
}

async function pollForRunCompletion(threadId, runId) {
	return new Promise((resolve, reject) => {
		const interval = setInterval(async () => {
			try {
				const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
				if (runStatus.status === "completed") {
					clearInterval(interval);
					const messagesList = await openai.beta.threads.messages.list(threadId);
					const messages = messagesList.data.map((msg) => ({
						role: msg.role.charAt(0).toUpperCase() + msg.role.slice(1),
						content: msg.content[0].text.value,
					}));
					resolve(messages);
				} else {
					console.log("Run is not complete");
				}
			} catch (error) {
				clearInterval(interval);
				reject(error);
			}
		}, 5000);
	});
}

const createChat = async (request, response) => {
	try {
		const { userId } = request.body;

		if (!userId) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!", null);
		}

		const { userID: authenticatingUserID } = request.jwtPayload;
		let dbUser = await users.findOne({ _id: authenticatingUserID });

		if (!dbUser) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "User not found", null);
		}

		if (userId === authenticatingUserID && (dbUser.userRole === "user" || dbUser.userRole === "admin")) {
			if (dbUser.threadID) {
				const newChat = new chat({
					threadID: dbUser.threadID,
					userID: authenticatingUserID,
					messages: [],
				});
				await newChat.save();
				return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Chat created successfully", newChat);
			} else {
				return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Thread not found", null);
			}
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Access denied!", null);
		}
	} catch (error) {}
};

const getAllMessages = async (request, response) => {
	try {
		const { chatID } = request.query;
		if (!chatID) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
		}

		const { userID: authenticatingUserID } = request.jwtPayload;

		if (authenticatingUserID) {
			// Fetch the user's chat data
			const chatData = await chat
				.findOne({ _id: chatID })
				.populate({
					path: "messages",
					options: { sort: { createdAt: 1 } },
				})
				.exec();

			if (!chatData) {
				return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Chat not found!");
			}

			const { messages } = chatData;

			return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "success", messages);
		} else {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Access denied!", null);
		}
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const getChats = async (request, response) => {
	try {
		const { userId } = request.query;

		if (!userId) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing parameters!");
		}

		const { userID: authenticatingUserID } = request.jwtPayload;

		if (authenticatingUserID !== userId) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.UNAUTHORIZED, false, "Access denied!", null);
		}

		const chats = await chat.find({ userID: userId }).select("-messages").populate("latestMessage");

		if (!chats || chats.length === 0) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "No chats found!", null);
		}

		return sendJsonResponse(response, HTTP_STATUS_CODES.OK, true, "Success", chats);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

const deleteChat = async (request, response) => {
	try {
		const { chatId } = request.query;
		const { userID: authenticatingUserID } = request.jwtPayload;

		if (!chatId) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.BAD_REQUEST, false, "Missing chat ID!");
		}

		// Find the chat by ID and ensure it belongs to the authenticated user
		const chatToDelete = await chat.findOne({ _id: chatId, userID: authenticatingUserID });

		if (!chatToDelete) {
			return sendJsonResponse(response, HTTP_STATUS_CODES.NOT_FOUND, false, "Chat not found or access denied!");
		}

		await chatMessage.deleteMany({ chat: chatToDelete._id });

		await chat.deleteOne({ _id: chatId });

		return sendJsonResponse(
			response,
			HTTP_STATUS_CODES.OK,
			true,
			"Chat and associated messages deleted successfully!",
			chatToDelete
		);
	} catch (error) {
		return sendJsonResponse(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, false, "Error occurred!", {
			error: error.message || error,
		});
	}
};

module.exports = { createOrRetrieveThread, addMessageToThread, getAllMessages, getChats, createChat, deleteChat };
