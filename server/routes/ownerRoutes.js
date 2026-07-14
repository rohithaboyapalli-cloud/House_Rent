const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");

const {
  addProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getOwnerBookings,
  updateBookingStatus,
} = require("../controllers/ownerController");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Add Property
router.post(
  "/properties",
  protect,
  authorizeRoles("owner"),
  upload.array("images", 5),
  addProperty
);
router.get(
  "/properties",
  protect,
  authorizeRoles("owner"),
  getMyProperties
);
router.put(
  "/properties/:id",
  protect,
  authorizeRoles("owner"),
  updateProperty
);
router.delete(
  "/properties/:id",
  protect,
  authorizeRoles("owner"),
  deleteProperty
);
router.get(
  "/bookings",
  protect,
  authorizeRoles("owner"),
  getOwnerBookings
);
router.put(
  "/bookings/:id",
  protect,
  authorizeRoles("owner"),
  updateBookingStatus
);

module.exports = router;