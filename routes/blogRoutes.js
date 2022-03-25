const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const blogController = require("../controllers/blogControllers");

router.get("/", auth, blogController.allBlogs_get);

router.get("/myblogs", auth, blogController.myBlogs_get);

router.get("/mybookmarks", auth, blogController.myBookmarks_get);

router.get("/create", auth, blogController.blog_create_get);

router.get("/:id", auth, blogController.blog_details);

router.post("/", auth, blogController.blog_create_post);

router.delete("/:id", auth, blogController.blog_delete);

module.exports = router;
