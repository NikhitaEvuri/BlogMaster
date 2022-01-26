const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogControllers");
const auth = require("../middleware/auth");

router.get("/", auth, blogController.allBlogs_get);

module.exports = router;
