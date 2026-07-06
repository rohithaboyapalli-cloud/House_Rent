const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/userController");
const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to your profile",
    user: req.user,
  });
});
router.get(
  "/dashboard",
  protect,
  authorizeRoles("user"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome User Dashboard",
    });
  }
);

// Register
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;