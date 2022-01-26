const home_get = (req, res) => {
  res.render("static/home", { userId: req.userId });
};

module.exports = { home_get };
