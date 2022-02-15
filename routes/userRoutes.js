const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const userValidators = require("../validators/userValidators");

router.get("/register", userController.register_get);
router.get("/login", userController.login_get);
router.get("/logout", userController.logout_get);

router.post(
  "/register",
  userValidators.registerValidator,
  userController.register_post
);

router.post("/login", userValidators.loginValidator, userController.login_post);

module.exports = router;
