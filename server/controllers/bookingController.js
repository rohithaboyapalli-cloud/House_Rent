const Booking = require("../models/BookingSchema");
const Property = require("../models/PropertySchema");

// Book Property
const bookProperty = async (req, res) => {
  try {
    const { propertyId, moveInDate, duration } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Prevent booking unavailable property
    if (property.status === "Booked") {
      return res.status(400).json({
        success: false,
        message: "Property is already booked",
      });
    }

    // Prevent owner from booking own property
    if (property.owner.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot book your own property",
      });
    }

    // Calculate total rent
    const totalAmount = property.rentAmount * duration;

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      property: propertyId,
      moveInDate,
      duration,
      totalAmount,
    });

    // Mark property as booked
    property.status = "Booked";
    await property.save();

    res.status(201).json({
      success: true,
      message: "Property booked successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("property")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only the user who created the booking can cancel it
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // Make the property available again
    const property = await Property.findById(booking.property);

    if (property) {
      property.status = "Available";
      await property.save();
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  bookProperty,
  getMyBookings,
  cancelBooking,
};