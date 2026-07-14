const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connect");

const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const adminRoutes = require("./routes/adminRoutes");

console.log("Server Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Server API Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "Server API Secret:",
  process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing"
);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("HouseRent Backend Running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});