const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const { getServices, createService, updateService, deleteService } = require("../controllers/services.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");

const router = express.Router();

router.get("/", jwtAuthentication, userAuthorization(["admin", "therapist"]), getServices);
router.post("/", jwtAuthentication, userAuthorization(["admin", "therapist"]), multerMiddleware(), createService);
router.put("/", jwtAuthentication, userAuthorization(["admin", "therapist"]), multerMiddleware(), updateService);
router.delete("/", jwtAuthentication, userAuthorization(["admin", "therapist"]), deleteService);

module.exports = router;
