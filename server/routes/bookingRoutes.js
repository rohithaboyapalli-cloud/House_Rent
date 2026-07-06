const express = require("express");
const router = express.Router();

const {
  bookProperty,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");
const {
  protect,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("user"),
  bookProperty
);
router.get(
  "/",
  protect,
  authorizeRoles("user"),
  getMyBookings
);
router.delete(
  "/:id",
  protect,
  authorizeRoles("user"),
  cancelBooking
);

module.exports = router;