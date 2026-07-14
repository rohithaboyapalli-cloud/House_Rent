import { useEffect, useState } from "react";
import api from "../../services/api";

function PendingOwners() {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const res = await api.get("/admin/pending-owners");
      console.log(res.data);
      setOwners(res.data.owners);
    } catch (error) {
      alert("Failed to load pending owners");
    }
  };

  const approveOwner = async (id) => {
    try {
      const res = await api.put(`/admin/approve-owner/${id}`);

      alert(res.data.message);

      fetchOwners();
    } catch (error) {
      alert(error.response?.data?.message || "Approval failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Pending Owner Approvals
      </h1>

      {owners.length === 0 ? (
        <h2 className="text-xl text-green-600">
          No pending owners.
        </h2>
      ) : (
        <table className="w-full border shadow-lg">

          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {owners.map((owner) => (
              <tr
                key={owner._id}
                className="border-b text-center"
              >
                <td className="p-3">{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.phone}</td>

                <td>
                  <button
                    onClick={() => approveOwner(owner._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}

export default PendingOwners;