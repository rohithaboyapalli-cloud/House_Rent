const Property = require("../models/PropertySchema");

// =====================
// Add Property
// =====================
const addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      rentAmount,
      propertyType,
      furnishingStatus,
      amenities,
      images,
    } = req.body;

    const property = await Property.create({
      owner: req.user.id,
      title,
      description,
      location,
      rentAmount,
      propertyType,
      furnishingStatus,
      amenities,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// Get My Properties
// =====================
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user.id,
    });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// Update Property
// =====================
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only the owner can update
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =====================
// Delete Property
// =====================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only the owner can delete
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const Booking = require("../models/BookingSchema");

// =====================
// Get Bookings for Owner's Properties
// =====================
const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "property",
        match: { owner: req.user.id },
      })
      .populate("user", "name email phone");

    // Remove bookings whose property doesn't belong to this owner
    const ownerBookings = bookings.filter(
      (booking) => booking.property !== null
    );

    res.status(200).json({
      success: true,
      count: ownerBookings.length,
      bookings: ownerBookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getOwnerBookings,
};