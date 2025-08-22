const express = require("express");
const { getMedia } = require("../controllers/guest");

const router = express.Router();

router.get("/media", getMedia);

module.exports = router;
