const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const { getPaymentInfo, getPaymentSession, cancelSubscriptionPlan, handleWebhook } = require("../controllers/payments.js");

const router = express.Router();

router.get("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), getPaymentInfo);
router.get("/session", jwtAuthentication, userAuthorization(["user", "therapist"]), getPaymentSession);
router.post("/webhook", handleWebhook);

router.delete("/subscription", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), cancelSubscriptionPlan);

module.exports = router;
