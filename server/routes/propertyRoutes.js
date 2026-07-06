const express = require("express");
const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
} = require("../controllers/propertyController");

// Public Routes
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

module.exports = router;