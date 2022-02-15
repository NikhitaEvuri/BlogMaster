const express = require("express");
const router = express.Router();

const staticController = require("../controllers/staticControllers");

router.get("/", staticController.home_get);

router.get("/about", staticController.aboutUs_get);

router.get("/contact", staticController.contactUs_get);

module.exports = router;
