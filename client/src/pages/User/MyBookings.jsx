import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data.bookings);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const res = await api.delete(`/bookings/${id}`);
      toast.success(res.data.message);
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <h2>No bookings found.</h2>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg shadow p-5"
            >
              <h2 className="text-2xl font-bold">
                {booking.property.title}
              </h2>

              <p>📍 {booking.property.location}</p>

              <p>💰 ₹{booking.totalAmount}</p>

              <p>
                📅 Move In:{" "}
                {new Date(booking.moveInDate).toLocaleDateString()}
              </p>

              <p>⏳ Duration: {booking.duration} month(s)</p>

              <button
                onClick={() => cancelBooking(booking._id)}
                className="bg-red-600 text-white px-5 py-2 rounded mt-4"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;