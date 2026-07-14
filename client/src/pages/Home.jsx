import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [properties, setProperties] = useState([]);

const [filters, setFilters] = useState({
  location: "",
  propertyType: "",
  maxRent: "",
  sort: "",
});

  useEffect(() => {
  fetchProperties();
}, [filters]);

  const fetchProperties = async () => {
  try {
    const params = {};

    if (filters.location)
      params.location = filters.location;

    if (filters.propertyType)
      params.propertyType = filters.propertyType;

    if (filters.maxRent)
      params.maxRent = filters.maxRent;

    if (filters.sort)
  params.sort = filters.sort;

    const res = await api.get("/properties", {
      params,
    });

    setProperties(res.data.properties);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">
          Find Your Dream Rental Home
        </h1>

        <p className="mt-4 text-xl">
          Browse verified rental properties.
        </p>
      </section>

      {/* Properties */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <section className="max-w-7xl mx-auto px-6 py-10">

  <div className="grid md:grid-cols-5 gap-4">

    <input
      type="text"
      placeholder="Search Location"
      className="border rounded p-3"
      value={filters.location}
      onChange={(e) =>
        setFilters({
          ...filters,
          location: e.target.value,
        })
      }
    />

    <select
  className="border rounded p-3"
  value={filters.sort}
  onChange={(e) =>
    setFilters({
      ...filters,
      sort: e.target.value,
    })
  }
>
  <option value="">Sort By</option>
  <option value="low">Rent: Low → High</option>
  <option value="high">Rent: High → Low</option>
  <option value="newest">Newest First</option>
  <option value="oldest">Oldest First</option>
</select>

    <select
      className="border rounded p-3"
      value={filters.propertyType}
      onChange={(e) =>
        setFilters({
          ...filters,
          propertyType: e.target.value,
        })
      }
    >
      <option value="">All Types</option>
      <option value="Apartment">Apartment</option>
      <option value="House">House</option>
      <option value="Villa">Villa</option>
      <option value="PG">PG</option>
    </select>

    <input
      type="number"
      placeholder="Max Rent"
      className="border rounded p-3"
      value={filters.maxRent}
      onChange={(e) =>
        setFilters({
          ...filters,
          maxRent: e.target.value,
        })
      }
    />

    <button
      onClick={fetchProperties}
      className="bg-blue-700 text-white rounded p-3 hover:bg-blue-800"
    >
      Search
    </button>

  </div>

</section>

        <h2 className="text-4xl font-bold mb-10">
          Available Properties
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {properties.map((property) => (

            <div
              key={property._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >

              <img
  src={
    property.images?.length > 0
      ? property.images[0]
      : "https://placehold.co/600x400"
  }
  alt={property.title}
  className="w-full h-52 object-cover rounded"
/>

              <div className="p-5">

                <h3 className="text-2xl font-bold">
                  {property.title}
                </h3>

                <p className="text-gray-500">
                  📍 {property.location}
                </p>

                <p className="mt-2">
                  ₹ {property.rentAmount}/month
                </p>

                <p className="mt-2">
                  {property.propertyType}
                </p>

                <Link
                  to={`/property/${property._id}`}
                  className="inline-block mt-4 bg-blue-700 text-white px-5 py-2 rounded"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Home;