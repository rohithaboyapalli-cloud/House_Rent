import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import OwnerDashboard from "./pages/Owner/Dashboard";
import AddProperty from "./pages/Owner/AddProperty";
import MyProperties from "./pages/Owner/MyProperties";
import OwnerMyBookings from "./pages/Owner/MyBookings";
import EditProperty from "./pages/Owner/EditProperty";

import UserMyBookings from "./pages/User/MyBookings";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminProperties from "./pages/Admin/Properties";
import AdminBookings from "./pages/Admin/Bookings";
import PendingOwners from "./pages/admin/PendingOwners";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/profile" element={<Profile />} />

          {/* Owner Routes */}
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/add-property" element={<AddProperty />} />
          <Route path="/owner/my-properties" element={<MyProperties />} />
          <Route
            path="/owner/bookings"
            element={<OwnerMyBookings />}
          />
          <Route
            path="/owner/edit-property/:id"
            element={<EditProperty />}
          />

          {/* User Routes */}
          <Route
            path="/my-bookings"
            element={<UserMyBookings />}
          />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route
  path="/admin/properties"
  element={<AdminProperties />}
/>
<Route
  path="/admin/bookings"
  element={<AdminBookings />}
/>
<Route
  path="/admin/pending-owners"
  element={<PendingOwners />}
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer
  position="top-right"
  autoClose={3000}
/>
    </div>
  );
}

export default App;