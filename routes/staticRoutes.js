const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const staticController = require("../controllers/staticControllers");

router.get("/", auth, staticController.home_get);

router.get("/about", auth, staticController.aboutUs_get);

router.get("/contact", auth, staticController.contactUs_get);

module.exports = router;
