const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, default: 0, min: 0 },
		description: String,
		duration: { type: { type: String, enum: ["month", "year"] }, value: Number },
		subscriptionFeatures: [
			{
				feature: { type: mongoose.Schema.Types.ObjectId, ref: "subscriptionFeatures" },
				status: { type: Boolean, default: true },
			},
		],
		payment: {
			type: { type: String, enum: ["once", "recurring"], default: "recurring" },
			price: Number,
			priceKey: String,
		},
		type: { type: String, enum: ["free", "paid"], default: "paid" },
		isActive: { type: Boolean, default: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("subscriptions", subscriptionSchema);
