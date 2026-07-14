import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [moveInDate, setMoveInDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await api.get(`/properties/${id}`);
      setProperty(res.data.property);

if (res.data.property.images?.length > 0) {
  setSelectedImage(res.data.property.images[0]);
}
    } catch (err) {
      toast.error("Failed to load properties");
    }
  };

  if (!property) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  const handleBooking = async () => {
  try {
    const res = await api.post("/bookings", {
      propertyId: id,
      moveInDate,
      duration,
    });

    toast.success(res.data.message);
  } catch (err) {
    toast.error("Booking Failed");
  }
};

  return (
    <div className="max-w-5xl mx-auto p-8">

     <div className="mb-8">

  {/* Main Image */}
  <img
    src={selectedImage || "https://placehold.co/900x500"}
    alt={property.title}
    className="w-full h-[500px] object-cover rounded-xl"
  />

  {/* Thumbnails */}
  {property.images?.length > 1 && (
    <div className="flex gap-3 mt-4 overflow-x-auto">

      {property.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Property ${index + 1}`}
          onClick={() => setSelectedImage(image)}
          className={`w-28 h-20 object-cover rounded-lg cursor-pointer border-2 ${
            selectedImage === image
              ? "border-blue-700"
              : "border-gray-300"
          }`}
        />
      ))}

    </div>
  )}

</div>

      <h1 className="text-4xl font-bold mt-6">
        {property.title}
      </h1>

      <p className="text-xl mt-2">
        📍 {property.location}
      </p>

      <p className="text-2xl font-bold text-blue-700 mt-3">
        ₹{property.rentAmount}/month
      </p>

      <p className="mt-6">
        {property.description}
      </p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">

  <div>
    <h3 className="font-bold text-lg">
      Property Type
    </h3>

    <p>{property.propertyType}</p>
  </div>

  <div>
    <h3 className="font-bold text-lg">
      Furnishing
    </h3>

    <p>{property.furnishingStatus}</p>
  </div>

</div>
<div className="mt-6">

  <h3 className="text-xl font-bold mb-3">
    Amenities
  </h3>

  <div className="flex flex-wrap gap-2">

    {property.amenities?.map((item, index) => (

      <span
        key={index}
        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
      >
        {item}
      </span>

    ))}

  </div>

</div>

      <div className="mt-8 space-y-4">

  <input
    type="date"
    value={moveInDate}
    onChange={(e) => setMoveInDate(e.target.value)}
    className="border p-3 rounded w-full"
  />

  <input
    type="number"
    min="1"
    placeholder="Duration (months)"
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    className="border p-3 rounded w-full"
  />

  {property.status === "Available" ? (
  <button
    onClick={handleBooking}
    disabled={!moveInDate || duration < 1}
    className={`px-8 py-3 rounded text-white ${
      !moveInDate || duration < 1
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }`}
  >
    Book Now
  </button>
) : (
  <button
    disabled
    className="bg-red-600 text-white px-8 py-3 rounded cursor-not-allowed"
  >
    Not Available
  </button>
)}

</div>

    </div>
  );
}

export default PropertyDetails;