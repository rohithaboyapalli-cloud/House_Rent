const express = require("express");
console.log("✅ adminRoutes.js loaded");
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("Admin route is working");
});
const {
  getDashboardStats,
  getAllUsers,
  getAllProperties,
  getAllBookings,
  getPendingOwners,
  approveOwner,
  deleteUser,
  deleteProperty,
} = require("../controllers/adminController");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Get All Users
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// Get All Properties
router.get(
  "/properties",
  protect,
  authorizeRoles("admin"),
  getAllProperties
);

// Get All Bookings
router.get(
  "/bookings",
  protect,
  authorizeRoles("admin"),
  getAllBookings
);

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

// Delete User
router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

// Delete Property
router.delete(
  "/properties/:id",
  protect,
  authorizeRoles("admin"),
  deleteProperty
);

// Get Pending Owners
router.get(
  "/pending-owners",
  protect,
  authorizeRoles("admin"),
  getPendingOwners
);

// Approve Owner
router.put(
  "/approve-owner/:id",
  protect,
  authorizeRoles("admin"),
  approveOwner
);
module.exports = router;