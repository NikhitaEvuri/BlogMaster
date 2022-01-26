const express = require("express");
const router = express.Router();

const staticController = require("../controllers/staticControllers");
const auth = require("../middleware/auth");

router.get("/", auth, staticController.home_get);

module.exports = router;
