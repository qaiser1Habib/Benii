const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema(
	{
		chat: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
		content: { type: String, required: true },
		role: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("chatMessages", chatMessageSchema);
