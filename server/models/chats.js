const mongoose = require("mongoose");

const chatGroupSchema = mongoose.Schema(
	{
		threadID: { type: String, required: true },
		userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "chatMessages" },
		messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "chatMessages" }],
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("chats", chatGroupSchema);
