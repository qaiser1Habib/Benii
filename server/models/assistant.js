const mongoose = require("mongoose");

const assistantSchema = mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		assistantID: { type: String, required: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("assistant", assistantSchema);
