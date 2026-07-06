const express = require("express");
const router = express.Router();

const {
  addProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getOwnerBookings,
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

module.exports = router;