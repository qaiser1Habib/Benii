const express = require("express");
const { jwtAuthentication } = require("../middlewares/authentications/jwtAuthentication.js");
const { userAuthorization } = require("../middlewares/authentications/userAuthorization.js");
const { createClient, removeClient, getClients } = require("../controllers/clients.js");

const router = express.Router();

router.post("/", jwtAuthentication, userAuthorization(["admin", "therapist"]), createClient);
router.delete("/", jwtAuthentication, userAuthorization(["admin", "therapist"]), removeClient);

module.exports = router;
