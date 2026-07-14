import { useEffect, useState } from "react";
import api from "../../services/api";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await api.get("/admin/properties");
      setProperties(res.data.properties);
    } catch (err) {
      alert("Failed to load properties");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await api.delete(`/admin/properties/${id}`);
      alert("Property deleted successfully");
      fetchProperties();
    } catch (err) {
      alert("Failed to delete property");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        All Properties
      </h1>

      <table className="w-full border shadow-lg">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-3">Title</th>
            <th>Owner</th>
            <th>Location</th>
            <th>Rent</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property._id} className="border-b text-center">
              <td className="p-3">{property.title}</td>
              <td>{property.owner?.name}</td>
              <td>{property.location}</td>
              <td>₹ {property.rentAmount}</td>
              <td>{property.status}</td>

              <td>
                <button
                  onClick={() => deleteProperty(property._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Properties;