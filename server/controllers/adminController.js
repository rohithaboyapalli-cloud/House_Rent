const User = require("../models/UserSchema");
const Property = require("../models/PropertySchema");
const Booking = require("../models/BookingSchema");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "name email"
    );

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

// Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("property", "title location");

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
// Get all pending owners
const getPendingOwners = async (req, res) => {
  try {
    const owners = await User.find({
      role: "owner",
      isApproved: false,
    }).select("-password");

    res.status(200).json({
      success: true,
      count: owners.length,
      owners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Approve owner
const approveOwner = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    owner.isApproved = true;
    await owner.save();

    res.status(200).json({
      success: true,
      message: "Owner approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalOwners = await User.countDocuments({
      role: "owner",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalProperties =
      await Property.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalOwners,
        totalAdmins,
        totalProperties,
        totalBookings,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Property
const deleteProperty = async (req, res) => {
  try {
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

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllProperties,
  getAllBookings,
  getPendingOwners,
  approveOwner,
  deleteUser,
  deleteProperty,
};