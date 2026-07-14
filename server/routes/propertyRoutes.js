const express = require("express");
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

// Public Routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

// Owner Route
router.put(
  "/:id",
  protect,
  authorizeRoles("owner", "admin"),
  updateProperty
);

// Owner/Admin - Delete Property
router.delete(
  "/:id",
  protect,
  authorizeRoles("owner", "admin"),
  deleteProperty
);

module.exports = router;