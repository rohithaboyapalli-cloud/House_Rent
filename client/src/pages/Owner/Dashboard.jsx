import { Link } from "react-router-dom";

function OwnerDashboard() {
  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Owner Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link
          to="/owner/add-property"
          className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700"
        >
          <h2 className="text-2xl font-bold">➕ Add Property</h2>
          <p>Add a new rental property.</p>
        </Link>

        <Link
          to="/owner/my-properties"
          className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700"
        >
          <h2 className="text-2xl font-bold">🏠 My Properties</h2>
          <p>View all your properties.</p>
        </Link>

        <Link
          to="/owner/bookings"
          className="bg-purple-600 text-white p-6 rounded-xl shadow hover:bg-purple-700"
        >
          <h2 className="text-2xl font-bold">📅 Bookings</h2>
          <p>See booking requests.</p>
        </Link>

      </div>

    </div>
  );
}

export default OwnerDashboard;