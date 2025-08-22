const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema(
	{
		title: String,
		description: String,
		media: { filename: String, mimetype: String },
		isActive: { type: Boolean, default: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("resources", resourceSchema);
