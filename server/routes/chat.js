const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");
const {
	createOrRetrieveThread,
	addMessageToThread,
	getAllMessages,
	getChats,
	createChat,
	deleteChat,
} = require("../controllers/chats.js");

const router = express.Router();

router.post("/create-thread", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), createOrRetrieveThread);
router.post("/create-chat", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), createChat);
router.post("/", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), addMessageToThread);
router.get("/", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), getAllMessages);
router.get("/get-chats", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), getChats);
router.delete("/", jwtAuthentication, userAuthorization(["admin", "user"]), multerMiddleware(), deleteChat);

module.exports = router;
