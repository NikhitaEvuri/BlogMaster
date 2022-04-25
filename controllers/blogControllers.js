const Blog = require("../models/blog");
const User = require("../models/user");

const allBlogs_get = async (req, res) => {
  if (!req.userId) return res.redirect("/login");

  const blogs = await Blog.aggregate([
    {
      $project: {
        title: 1,
        description: 1,
        likesCount: 1,
        lastEdited: 1,
        bookmarks: 1,
        likes: 1,
        authorId: { $toObjectId: "$author" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $set: {
        authorDetails: { $first: "$authorDetails" },
      },
    },
    {
      $set: {
        authorName: "$authorDetails.name",
      },
    },
    { $unset: ["authorDetails", "authorId"] },
  ]);

  res.render("blogs/allBlogs", {
    userId: req.userId,
    blogs,
  });
};

const myBlogs_get = async (req, res) => {
  if (!req.userId) return res.redirect("/login");

  const blogs = await Blog.find({ author: req.userId });
  res.render("blogs/myBlogs", { userId: req.userId, blogs });
};

const myBookmarks_get = async (req, res) => {
  if (!req.userId) return res.redirect("/login");

  const blogs = await Blog.aggregate([
    {
      $project: {
        title: 1,
        description: 1,
        likesCount: 1,
        lastEdited: 1,
        bookmarks: 1,
        likes: 1,
        authorId: { $toObjectId: "$author" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $set: {
        authorDetails: { $first: "$authorDetails" },
      },
    },
    {
      $set: {
        authorName: "$authorDetails.name",
      },
    },
    { $unset: ["authorDetails", "authorId"] },
  ]);

  res.render("blogs/myBookmarks", { userId: req.userId, blogs });
};

const blog_details = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  const user = await User.findById(blog.author);

  blog.authorName = user.name;
  if (!blog) res.redirect("/blogs");

  res.render("blogs/details", { userId: req.userId, blog });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { userId: req.userId });
};

const blog_update_get = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) res.redirect("/blogs");

  res.render("blogs/update", { userId: req.userId, blog });
};

const blog_create_post = async (req, res) => {
  const blogDetails = { ...req.body, author: req.userId };
  const blog = new Blog(blogDetails);
  await blog.save();
  res.redirect("/blogs");
};

const blog_update_post = async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.body = req.body.body;
  await blog.save();
  res.redirect("/blogs/myBlogs");
};

const blog_bookmark = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.redirect("/blogs");

  const index = blog.bookmarks.findIndex((id) => id === req.userId);

  if (index === -1) {
    blog.bookmarks.push(req.userId);
  } else {
    blog.bookmarks = blog.bookmarks.filter((id) => id !== req.userId);
  }

  await blog.save();
  res.redirect(req.get("referer"));
};

const blog_like = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.redirect("/blogs");

  const index = blog.likes.findIndex((id) => id === req.userId);

  if (index === -1) {
    blog.likes.push(req.userId);
  } else {
    blog.likes = blog.likes.filter((id) => id !== req.userId);
  }

  await blog.save();
  res.redirect(req.get("referer"));
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
  blog_bookmark,
  blog_like,
  blog_update_get,
  blog_update_post,
};
