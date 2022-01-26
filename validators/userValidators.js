const registerValidator = async (req, res, next) => {
  const { username, password, confirmPassword, name, email } = req.body;

  if (!username || !password || !confirmPassword || !name || !email) {
    return res.render("user/register", {
      data: req.body,
      errorMessage: "Fill all the details !",
      userId: null,
    });
  }

  if (password.length < 8) {
    return res.render("user/register", {
      data: req.body,
      errorMessage: "Password length should be greater or equal to 8 !",
      userId: null,
    });
  }

  if (confirmPassword !== password) {
    return res.render("user/register", {
      data: req.body,
      errorMessage: "Passwords do not match !",
      userId: null,
    });
  }

  next();
};

const loginValidator = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("user/login", {
      data: req.body,
      errorMessage: "Fill all the details !",
      userId: null,
    });
  }

  next();
};

module.exports = { registerValidator, loginValidator };
