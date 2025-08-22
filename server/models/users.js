const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		email: { type: String },
		password: String,
		about: {
			firstName: String,
			lastName: String,
			phone: String,
			streetAddress: String,
			houseNumber: String,
			city: String,
			state: String,
			postalCode: String,
			profileImage: { filename: String, mimetype: String },
		},
		therapist: {
			specialization: String,
			qualification: String,
			experience: String,
			practice: String,
			session: String,
			therapeuticApproaches: String,
			bio: String,
			clients: [
				{
					clientID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
					activityStatus: { type: Boolean, default: false },
				},
			],
			invites: [
				{
					email: { type: String, required: true },
					about: {
						firstName: String,
						lastName: String,
					},
					clientAdditionalDetail: [
						{
							questionID: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
							answer: String,
						},
					],
					activityStatus: { type: Boolean, default: false },
				},
			],
			services: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
		},
		subscription: {
			subscriptionPlanID: { type: mongoose.Schema.Types.ObjectId, ref: "subscriptions" },
			paymentID: String,
			schedule: { start: Date, end: Date },
			paymentStatus: { type: String, default: "unpaid" },
			isActive: { type: Boolean, default: false },
			isActiveByAdmin: { type: Boolean, default: false },
			cancelation: { status: { type: Boolean, default: false }, date: Date, reason: String },
		},

		passwordReset: {
			count: { type: Number, min: 0, default: 0 },
			code: { type: Number, default: null },
			lastResetDate: Date,
			expiresAt: Date,
		},
		isVerified: {
			status: { type: Boolean, default: false },
			verifiedByTherapist: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
			code: Number,
			createdAt: Date,
			expiresAt: Date,
		},
		clientAdditionalDetail: [
			{
				questionID: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
				answer: String,
			},
		],
		threadID: { type: String, default: null },
		userRole: { type: String, default: "user", enum: ["admin", "therapist", "user"] },
		isActive: { type: Boolean, default: true },
		isApproved: { type: Boolean, default: true },
		isFeatured: { type: Boolean, default: false },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	},
	{ timestamps: true }
);
userSchema.index({ email: 1, userRole: 1 }, { unique: true });

module.exports = mongoose.model("users", userSchema);
