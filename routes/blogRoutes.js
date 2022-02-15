const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blogControllers");

router.get("/", blogController.allBlogs_get);

router.get("/myblogs", blogController.myBlogs_get);

router.get("/mybookmarks", blogController.myBookmarks_get);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.post("/", blogController.blog_create_post);

router.delete("/:id", blogController.blog_delete);

module.exports = router;
