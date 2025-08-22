const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");

const { getAppointments, createAppointment, updateAppointment, deleteAppointment } = require("../controllers/appointments.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const multerMiddleware = require("../middlewares/storage/multerMiddleware.js");

const router = express.Router();

router.get("/", getAppointments);
router.post("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), multerMiddleware(), createAppointment);
router.put("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), multerMiddleware(), updateAppointment);
router.delete("/", jwtAuthentication, userAuthorization(["admin", "therapist", "user"]), deleteAppointment);

module.exports = router;
