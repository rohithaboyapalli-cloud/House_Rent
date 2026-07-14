import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

function AddProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  location: "",
  rentAmount: "",
 propertyType: "Apartment",
  furnishingStatus: "Furnished",
  amenities: "",
  images: [],
});
const [previewImages, setPreviewImages] = useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("rentAmount", formData.rentAmount);
    data.append("propertyType", formData.propertyType);
    data.append("furnishingStatus", formData.furnishingStatus);

    data.append("amenities", formData.amenities);

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    const res = await api.post("/owner/properties", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(res.data.message);

    navigate("/owner/my-properties");

  } catch (error) {
    toast.error(error.response?.data?.message || "Error adding property");
  }
};

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Add Property
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Property Title"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="rentAmount"
          type="number"
          placeholder="Rent Amount"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    const files = Array.from(e.target.files);

    setFormData({
      ...formData,
      images: files,
    });

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  }}
/>
{previewImages.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
    {previewImages.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Preview ${index + 1}`}
        className="w-full h-32 object-cover rounded-lg border shadow"
      />
    ))}
  </div>
)}
        <select
          name="propertyType"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Apartment</option>
          <option>Villa</option>
          <option>House</option>
        </select>

        <select
          name="furnishingStatus"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>

        <input
          name="amenities"
          placeholder="Amenities (WiFi, Parking, Gym)"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        

        <button
          className="bg-blue-700 text-white px-6 py-3 rounded"
        >
          Add Property
        </button>

      </form>

    </div>
  );
}

export default AddProperty;