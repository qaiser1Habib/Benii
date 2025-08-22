const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
	{
		title: String,
		question: { type: String, required: true },
		type: { type: String, required: true, enum: ["short", "long", "mcq"] },
		options: [String],
		isActive: { type: Boolean, default: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("questions", questionSchema);
