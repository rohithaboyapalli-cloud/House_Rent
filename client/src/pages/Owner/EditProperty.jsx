import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    rentAmount: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await api.get(`/properties/${id}`);

      setFormData({
        title: res.data.property.title,
        description: res.data.property.description,
        location: res.data.property.location,
        rentAmount: res.data.property.rentAmount,
      });
    } catch (err) {
      toast.error("Failed to load property");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/owner/properties/${id}`, formData);

      toast.success("Property updated successfully");

      navigate("/owner/my-properties");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="rentAmount"
          type="number"
          value={formData.rentAmount}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="bg-green-600 text-white px-6 py-3 rounded">
          Update Property
        </button>
      </form>
    </div>
  );
}

export default EditProperty;