const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const userValidators = require("../validators/userValidators");

router.get("/register", userController.register_get);

router.post(
  "/register",
  userValidators.registerValidator,
  userController.register_post
);

router.get("/login", userController.login_get);

router.post("/login", userValidators.loginValidator, userController.login_post);

router.get("/logout", userController.logout_get);

module.exports = router;
