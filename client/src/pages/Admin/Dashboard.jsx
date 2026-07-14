import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data.stats);
    } catch (err) {
      alert("Failed to load dashboard");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-5 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl">Users</h2>
          <p className="text-4xl font-bold">
            {stats.totalUsers || 0}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl">Owners</h2>
          <p className="text-4xl font-bold">
            {stats.totalOwners || 0}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl">Admins</h2>
          <p className="text-4xl font-bold">
            {stats.totalAdmins || 0}
          </p>
        </div>
        <Link
  to="/admin/pending-owners"
  className="bg-blue-700 text-white p-6 rounded-xl text-center shadow-lg hover:bg-blue-800"
>
  Pending Owners
</Link>

        <div className="bg-yellow-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl">Properties</h2>
          <p className="text-4xl font-bold">
            {stats.totalProperties || 0}
          </p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow">
          <h2 className="text-xl">Bookings</h2>
          <p className="text-4xl font-bold">
            {stats.totalBookings || 0}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;