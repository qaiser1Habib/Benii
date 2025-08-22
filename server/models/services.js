const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
	{
		therapistID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		title: String,
		serviceOffer: String,
		description: String,
		price: Number,
		duration: String,
		// availableSlots: [{ start: Date, end: Date }],
		isActive: { type: Boolean, default: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("services", serviceSchema);
