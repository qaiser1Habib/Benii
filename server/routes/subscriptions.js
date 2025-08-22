const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const {
	getSubscriptions,
	createSubscription,
	updateSubscription,
	deleteSubscription,
} = require("../controllers/subscriptions.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const {
	getSubscriptionFeatures,
	createSubscriptionFeature,
	updateSubscriptionFeature,
	deleteSubscriptionFeature,
} = require("../controllers/subscriptionFeatures.js");

const router = express.Router();

router.get("/", getSubscriptions);
router.post("/", jwtAuthentication, userAuthorization(["admin", "user"]), createSubscription);
router.put("/", jwtAuthentication, userAuthorization(["admin", "user"]), updateSubscription);
router.delete("/", jwtAuthentication, userAuthorization(["admin", "user"]), deleteSubscription);

router.get("/features", getSubscriptionFeatures);
router.post("/features", jwtAuthentication, userAuthorization(["admin", "user"]), createSubscriptionFeature);
router.put("/features", jwtAuthentication, userAuthorization(["admin", "user"]), updateSubscriptionFeature);
router.delete("/features", jwtAuthentication, userAuthorization(["admin", "user"]), deleteSubscriptionFeature);

module.exports = router;
