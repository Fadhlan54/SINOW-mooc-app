const router = require("express").Router();

const User = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const uploader = require("../middlewares/uploader");

router.get("/", authenticate, User.myDetails);
router.put(
  "/update",
  authenticate,
  uploader.single("image"),
  User.updateMyDetails
);
router.put("/change-password", authenticate, User.changeMyPassword);

module.exports = router;
