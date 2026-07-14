import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-2xl font-bold">
          HouseRent
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/">Home</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span className="font-semibold">
                Welcome, {user.name}
              </span>

              <Link to="/profile">
  Profile
</Link>

{user.role === "user" && (
  <Link to="/my-bookings">
    My Bookings
  </Link>
)}

{user.role === "owner" && (
  <>
    <Link to="/owner">
      Dashboard
    </Link>

    <Link to="/owner/my-properties">
      My Properties
    </Link>

    <Link to="/owner/bookings">
      Booking Requests
    </Link>
  </>
)}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;