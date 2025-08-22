const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
	{
		therapistID: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
		clientID: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
		description: { type: String, required: true },
		schedule: {
			date: { type: Date, required: true },
			startTime: { type: Date, required: true },
			endTime: { type: Date, required: true },
			location: String,
		},
		isActive: { type: Boolean, default: true },
		status: {
			type: String,
			enum: ["scheduled", "pending", "confirmed", "canceled", "completed"],
			default: "pending",
		},
		notes: String,
		recurrence: {
			frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: null },
			interval: { type: Number, default: 1 },
			endDate: Date,
		},
		feedback: String,
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("appointments", appointmentSchema);
