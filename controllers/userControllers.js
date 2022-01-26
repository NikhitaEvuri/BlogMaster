const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register_get = (req, res) => {
  if (req.userId) return res.redirect("/");
  res.render("user/register", { errorMessage: null, data: {}, userId: null });
};

const login_get = (req, res) => {
  if (req.userId) return res.redirect("/");
  res.render("user/login", { errorMessage: null, data: {}, userId: null });
};

const logout_get = (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .redirect("/login");
};

const register_post = async (req, res) => {
  const { username, password, name, email } = req.body;

  const existingUsername = await User.findOne({ username });

  if (existingUsername) {
    return res.render("user/register", {
      data: req.body,
      errorMessage: "Username already exists !",
      userId: null,
    });
  }

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return res.render("user/register", {
      data: req.body,
      errorMessage: "Email already exists !",
      userId: null,
    });
  }

  // password hashing to store in database
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({ username, passwordHash, name, email });
  const savedUser = await newUser.save();

  // token generation
  const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 604800000,
    })
    .redirect("/blogs");
};

const login_post = async (req, res) => {
  const { username, password } = req.body;

  const existingUsername = await User.findOne({ username });

  if (!existingUsername) {
    return res.render("user/login", {
      data: req.body,
      errorMessage: "Invalid Username !",
      userId: null,
    });
  }

  const passwordCorrect = await bcrypt.compare(
    password,
    existingUsername.passwordHash
  );

  if (!passwordCorrect)
    return res.render("user/login", {
      data: req.body,
      errorMessage: "Invalid Password !",
      userId: null,
    });

  const token = jwt.sign(
    { userId: existingUsername._id },
    process.env.JWT_SECRET
  );

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 604800000,
    })
    .redirect("/blogs");
};

module.exports = {
  register_get,
  register_post,
  login_get,
  login_post,
  logout_get,
};
