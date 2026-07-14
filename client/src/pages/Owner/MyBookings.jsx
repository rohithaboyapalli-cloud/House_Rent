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
    const res = await api.get("/owner/bookings");
    setBookings(res.data.bookings);
  } catch (err) {
    console.log(err.response);
    toast.error(err.response?.data?.message || err.message);
  }
};

const updateStatus = async (id, status) => {
  try {
    const res = await api.put(`/owner/bookings/${id}`, {
      status,
    });

    toast.success(res.data.message);

    fetchBookings();
  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Booking Requests
      </h1>

      {bookings.length === 0 ? (
        <h2>No booking requests.</h2>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold">
                🏠 {booking.property.title}
              </h2>

              <p>📍 {booking.property.location}</p>

              <hr className="my-3" />

              <p>
                <b>User:</b> {booking.user.name}
              </p>

              <p>
                <b>Email:</b> {booking.user.email}
              </p>

              <p>
                <b>Phone:</b> {booking.user.phone}
              </p>

              <p>
                <b>Move In:</b>{" "}
                {new Date(booking.moveInDate).toLocaleDateString()}
              </p>

              <p>
                <b>Duration:</b> {booking.duration} months
              </p>

              <p>
                <b>Total Rent:</b> ₹{booking.totalAmount}
              </p>

              <p>
                <b>Status:</b> {booking.bookingStatus}
              </p>
              <div className="flex gap-4 mt-4">
  <button
    onClick={() => updateStatus(booking._id, "Accepted")}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    ✅ Accept
  </button>

  <button
    onClick={() => updateStatus(booking._id, "Rejected")}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    ❌ Reject
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;