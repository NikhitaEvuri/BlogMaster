const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const userValidators = require("../validators/userValidators");
const auth = require("../middleware/auth");

router.get("/register", auth, userController.register_get);
router.get("/login", auth, userController.login_get);
router.get("/logout", auth, userController.logout_get);
router.get("/profile", auth, userController.profile_get);

router.post(
  "/register",
  userValidators.registerValidator,
  userController.register_post
);

router.post("/login", userValidators.loginValidator, userController.login_post);

router.post("/info", auth, userController.update_info);
router.post("/changepassword", auth, userController.change_password);
module.exports = router;
