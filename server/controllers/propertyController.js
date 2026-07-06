const Property = require("../models/PropertySchema");

// =======================
// Get All Available Properties
// =======================
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      status: "Available",
    }).populate("owner", "name email phone");

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

// =======================
// Get Property By ID
// =======================
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email phone");

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
};