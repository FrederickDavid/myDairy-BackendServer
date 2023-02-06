const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multer");
const {
  createUser,
  getAllUsers,
  getUser,
  resetUser,
  updateUser,
  deleteUser,
  newPassword,
  signinUser,
  verifyUser,
} = require("../controller/userController");

router.route("/").get(getAllUsers);

router.route("/signin").post(signinUser);
router.route("/register").post(upload, createUser);

router.route("/reset/:id/:token").post(resetUser);
router.route("/newpass/:id/:token").patch(newPassword);

router.route("/:id/:token").get(verifyUser);

router.route("/:id").patch(upload, updateUser).delete(deleteUser).get(getUser);

module.exports = router;
