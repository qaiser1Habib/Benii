const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const { getResources, createResource, updateResource, deleteResource } = require("../controllers/resources.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");

const router = express.Router();

router.get("/", getResources);
router.post("/", jwtAuthentication, userAuthorization(["admin"]), multerMiddleware(), createResource);
router.put("/", jwtAuthentication, userAuthorization(["admin"]), multerMiddleware(), updateResource);
router.delete("/", jwtAuthentication, userAuthorization(["admin"]), deleteResource);

module.exports = router;
