const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const userValidators = require("../validators/userValidators");

router.get("/register", auth, userController.register_get);
router.get("/login", auth, userController.login_get);
router.get("/logout", userController.logout_get);

router.post(
  "/register",
  userValidators.registerValidator,
  userController.register_post
);

router.post("/login", userValidators.loginValidator, userController.login_post);

module.exports = router;
