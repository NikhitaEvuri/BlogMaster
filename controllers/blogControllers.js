const Blog = require("../models/blog");

const allBlogs_get = async (req, res) => {
  if (!req.userId) return res.redirect("/login");

  const blogs = await Blog.find();
  res.render("blogs/allBlogs", {
    userId: req.userId,
    blogs,
  });
};

const myBlogs_get = (req, res) => {
  if (!req.userId) return res.redirect("/login");

  res.render("blogs/myBlogs", { userId: req.userId });
};

const myBookmarks_get = (req, res) => {
  if (!req.userId) return res.redirect("/login");

  res.render("blogs/myBookmarks", { userId: req.userId });
};

const blog_details = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) res.redirect("/blogs");

  res.render("blogs/details", { userId: req.userId, blog });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { userId: req.userId });
};

const blog_create_post = async (req, res) => {
  const blogDetails = { ...req.body, author: req.userId };
  const blog = new Blog(blogDetails);
  await blog.save();
  res.redirect("/blogs");
};

const blog_delete = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.redirect("/blogs");
};

module.exports = {
  allBlogs_get,
  myBlogs_get,
  myBookmarks_get,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
