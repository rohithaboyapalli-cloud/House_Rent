const Property = require("../models/PropertySchema");

// =======================
// Get All Available Properties
// =======================
const getAllProperties = async (req, res) => {
  try {
    const {
      location,
      propertyType,
      maxRent,
    } = req.query;

    let filter = {
      status: "Available",
    };

    // Search by Location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Filter by Property Type
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    // Filter by Maximum Rent
    if (maxRent) {
      filter.rentAmount = {
        $lte: Number(maxRent),
      };
    }

    let sortOption = {};

if (req.query.sort === "low") {
  sortOption = { rentAmount: 1 };
} else if (req.query.sort === "high") {
  sortOption = { rentAmount: -1 };
} else if (req.query.sort === "newest") {
  sortOption = { createdAt: -1 };
} else if (req.query.sort === "oldest") {
  sortOption = { createdAt: 1 };
}

const properties = await Property.find(filter)
  .sort(sortOption)
  .populate("owner", "name email phone");

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

// =======================
// Update Property
// =======================
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only the owner can update the property
    // Only the owner or admin can update the property
if (
  property.owner.toString() !== req.user.id &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    success: false,
    message: "Access Denied",
  });
}

    const updatedProperty = await Property.findByIdAndUpdate(
  req.params.id,
  req.body,
  {
    returnDocument: "after",
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

// =======================
// Delete Property
// =======================
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only owner or admin can delete
    if (
      property.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
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

module.exports = {
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};