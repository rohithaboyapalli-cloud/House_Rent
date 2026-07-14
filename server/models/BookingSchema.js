const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    moveInDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Put the console.log AFTER the schema is created
console.log(
  "Booking enum values:",
  bookingSchema.path("bookingStatus").enumValues
);

module.exports = mongoose.model("Booking", bookingSchema);