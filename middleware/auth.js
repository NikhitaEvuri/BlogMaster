const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) next();

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;

    next();
  } catch (err) {
    next();
  }
};

module.exports = auth;
