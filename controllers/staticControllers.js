const home_get = (req, res) => {
  res.render("static/home", { userId: req.userId });
};

const aboutUs_get = (req, res) => {
  res.render("static/aboutUs", { userId: req.userId });
};

const contactUs_get = (req, res) => {
  res.render("static/contactUs", { userId: req.userId });
};

module.exports = { home_get, aboutUs_get, contactUs_get };
