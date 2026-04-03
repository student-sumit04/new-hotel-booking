import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../components/Serach/FilterSidebar";
import ProductList from "../components/Serach/ProductList";
import { useSearch } from "../context/Serach";

const SearchPage = () => {
  const [search, setSearch] = useSearch();
  const [filteredResults, setFilteredResults] = useState([]);
  const quickCountries = ["India", "Australia", "New Zealand", "Japan", "China"];

  const applyFilters = async (filters) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/product-filters`,
        filters
      );
      if (response.data.success) {
        setFilteredResults(response.data.products);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleQuickCountrySearch = async (country) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/booking/search/${encodeURIComponent(
          country
        )}`
      );
      setFilteredResults([]);
      setSearch({ ...search, keyword: country, results: data });
    } catch (error) {
      console.error("Error applying quick country search:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 justify-center mt-8 px-4">
        {quickCountries.map((country) => (
          <button
            key={country}
            onClick={() => handleQuickCountrySearch(country)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              (search.keyword || "").toLowerCase() === country.toLowerCase()
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      <div className="flex justify-between ml-[9rem] mr-[9rem] mt-8">
        <FilterSidebar applyFilters={applyFilters} />
        <ProductList
          products={
            filteredResults.length > 0 ? filteredResults : search.results
          }
        />
      </div>
    </div>
  );
};

export default SearchPage;
