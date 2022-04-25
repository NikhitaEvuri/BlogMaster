const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const blogController = require("../controllers/blogControllers");

router.get("/", auth, blogController.allBlogs_get);

router.get("/myblogs", auth, blogController.myBlogs_get);

router.get("/mybookmarks", auth, blogController.myBookmarks_get);

router.get("/create", auth, blogController.blog_create_get);

router.get("/:id", auth, blogController.blog_details);

router.get("/:id/update", auth, blogController.blog_update_get);

router.post("/:id/update", auth, blogController.blog_update_post);

router.post("/", auth, blogController.blog_create_post);

router.post("/:id/bookmark", auth, blogController.blog_bookmark);

router.post("/:id/like", auth, blogController.blog_like);

router.delete("/:id", auth, blogController.blog_delete);

module.exports = router;
