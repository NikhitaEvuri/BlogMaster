const allBlogs_get = (req, res) => {
  if (!req.userId) return res.redirect("/login");

  res.render("blogs/allBlogs", { userId: req.userId });
};

module.exports = { allBlogs_get };
