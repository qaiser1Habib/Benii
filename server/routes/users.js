const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const {
	getUser,
	login,
	register,
	updateUser,
	updatePassword,
	sendPasswordResetEmail,
	passwordResetUsingVerificationEmail,
	deleteUser,

	sendUserVerificationEmail,
	verifyUserEmailByOTP,
} = require("../controllers/users.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");

const router = express.Router();

router.get("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), getUser);
router.post("/", multerMiddleware(), register);
router.put("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), multerMiddleware(), updateUser);
router.delete("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), deleteUser);

router.post("/password", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), updatePassword);
router.patch("/password", passwordResetUsingVerificationEmail);

router.post("/login", login);
router.post("/send-password-reset-email", sendPasswordResetEmail);
router.get("/verify/email", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), sendUserVerificationEmail);
router.post("/verify/otp", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), verifyUserEmailByOTP);

module.exports = router;
