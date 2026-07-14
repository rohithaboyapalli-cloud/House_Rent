import { useEffect, useState } from "react";
import api from "../../services/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/admin/bookings");
      setBookings(res.data.bookings);
    } catch (err) {
      alert("Failed to load bookings");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        All Bookings
      </h1>

      <table className="w-full border shadow-lg">
        <thead className="bg-purple-700 text-white">
          <tr>
            <th className="p-3">User</th>
            <th>Property</th>
            <th>Location</th>
            <th>Move In</th>
            <th>Duration</th>
            <th>Total Rent</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-b text-center">
              <td className="p-3">{booking.user?.name}</td>
              <td>{booking.property?.title}</td>
              <td>{booking.property?.location}</td>
              <td>
                {new Date(booking.moveInDate).toLocaleDateString()}
              </td>
              <td>{booking.duration} months</td>
              <td>₹ {booking.totalAmount}</td>
              <td>{booking.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;