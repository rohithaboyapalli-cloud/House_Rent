import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MyProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await api.get("/owner/properties");
      setProperties(res.data.properties);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load properties");
    }
  };
  const deleteProperty = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this property?"
  );

  if (!confirmDelete) return;

  try {
    const res = await api.delete(`/owner/properties/${id}`);

    toast.success(res.data.message);

    fetchProperties();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
  }
};

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Properties</h1>

      {properties.length === 0 ? (
        <h2>No properties found.</h2>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
  <div
    key={property._id}
    className="border rounded-xl shadow-lg overflow-hidden"
  >
    <img
  src={
    property.images?.length > 0
      ? property.images[0]
      : "https://placehold.co/600x400"
  }
  alt={property.title}
  className="w-full h-52 object-cover"
/>

    <div className="p-4">

      <h2 className="text-2xl font-bold">
        {property.title}
      </h2>

      <p>{property.location}</p>

      <p className="text-blue-700 font-bold mt-2">
        ₹{property.rentAmount}/month
      </p>

      {/* 👇 Add these buttons here */}
      <div className="flex gap-3 mt-4">

        <Link
  to={`/owner/edit-property/${property._id}`}
  className="bg-yellow-500 text-white px-4 py-2 rounded"
>
  Edit
</Link>

        <button
          onClick={() => deleteProperty(property._id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
))}
        </div>
      )}
    </div>
  );
}

export default MyProperties;