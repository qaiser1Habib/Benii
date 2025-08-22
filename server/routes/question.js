const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const { getQuestions, createQuestion, updateQuestion, deleteQuestion } = require("../controllers/questions.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");

const router = express.Router();

router.get("/", getQuestions);
router.post("/", jwtAuthentication, userAuthorization(["admin"]), multerMiddleware(), createQuestion);
router.put("/", jwtAuthentication, userAuthorization(["admin"]), multerMiddleware(), updateQuestion);
router.delete("/", jwtAuthentication, userAuthorization(["admin"]), deleteQuestion);

module.exports = router;
