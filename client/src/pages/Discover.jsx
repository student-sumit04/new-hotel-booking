import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";

const Discover = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [categories, setCategories] = useState([]);
  const countryChips = ["India", "Australia", "New Zealand", "Japan", "China"];

  useEffect(() => {
    fetchDestinations();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      console.error("API URL:", `${import.meta.env.VITE_BASE_URL}/api/category/get-category`);
    }
  };

  const fetchDestinations = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-post`
      );
      console.log("=== API Response ===");
      console.log("Success:", data.success);
      console.log("Products count:", data.products?.length);
      if (data.products && data.products.length > 0) {
        console.log("First product category:", data.products[0].category);
      }
      if (data?.success) {
        setDestinations(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinations = React.useMemo(() => {
    let filtered = destinations;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((dest) => {
        // Handle both populated object and string ID
        const destCategoryId =
          dest.category?._id?.toString() || dest.category?.toString();
        return destCategoryId === selectedCategory;
      });
    }

    if (selectedCountry !== "all") {
      const selectedCountryLower = selectedCountry.toLowerCase();
      filtered = filtered.filter((dest) =>
        dest.hotelLocation?.toLowerCase().includes(selectedCountryLower)
      );
    }

    return filtered;
  }, [destinations, selectedCategory, selectedCountry]);

  const handleExplore = (slug) => {
    navigate(`/product/${slug}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Explore the world's most beautiful hotels and destinations. Find your perfect getaway today.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 text-center mb-3">
            Quick Country Filter
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCountry("all")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                selectedCountry === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Countries
            </button>
            {countryChips.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  selectedCountry === country
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Destinations
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category._id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleExplore(destination.slug)}
            >
              <div className="relative h-64">
                <img
                  src={destination.images[0]}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                {destination.isAvailable ? (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Booked
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {destination.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{destination.hotelLocation}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="mr-1" />
                    <span className="font-semibold">4.5</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${destination.price}
                    <span className="text-sm text-gray-500">/night</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExplore(destination.slug);
                  }}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-500">
              No destinations found for the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
