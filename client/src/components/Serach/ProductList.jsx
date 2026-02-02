import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaUsers, FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useCart } from "../../context/Cart";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  const handleViewDetails = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleBookNow = (post) => {
    if (!auth?.token) {
      toast.error("Please login to book a hotel!");
      navigate("/login", { state: { from: `/product/${post.slug}` } });
      return;
    }
    
    // Navigate to hotel details page with booking form
    navigate(`/product/${post.slug}`);
  };

  const handleAddToWishlist = (post, e) => {
    e.stopPropagation();
    
    const existingItem = cart.find((item) => item._id === post._id);
    if (existingItem) {
      toast.info("Already in wishlist!");
      return;
    }

    const updatedCart = [...cart, post];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to wishlist!");
  };

  return (
    <div className="flex flex-col items-center w-[92%] relative bottom-7 ml-12">
      <h1 className="text-2xl font-bold mb-8 mt-9">
        {products.length < 1
          ? "No Products Found"
          : `Search Results Found: ${products.length}`}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-[24px]">
        {products.map((post) => (
          <article
            key={post._id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl w-[21rem] mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group bg-white"
            onClick={() => handleViewDetails(post.slug)}
          >
            {/* Hotel Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.images?.[0] || "https://via.placeholder.com/400x300?text=Hotel"}
                alt={post.title || "Hotel"}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              
              {/* Wishlist Button */}
              <button
                onClick={(e) => handleAddToWishlist(post, e)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
              >
                <FaHeart className="text-lg" />
              </button>

              {/* Availability Badge */}
              {post.isAvailable ? (
                <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Available
                </span>
              ) : (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Unavailable
                </span>
              )}

              {/* Hotel Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {post.title || "Hotel Name"}
                </h3>
              </div>
            </div>

            {/* Hotel Details */}
            <div className="p-5 bg-white">
              {/* Location */}
              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="text-sm truncate">{post.hotelLocation || "Location not available"}</span>
              </div>

              {/* Rating and Guest Capacity */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1 text-yellow-500">
                  <FaStar />
                  <span className="text-gray-700 font-semibold ml-1">
                    {post.rating || "4.5"}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">(Reviews)</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <FaUsers className="mr-1" />
                  <span>Up to {post.guest || 2} guests</span>
                </div>
              </div>

              {/* Description Preview */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {post.description || "Enjoy a comfortable stay with excellent amenities and services."}
              </p>

              {/* Price and Book Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    ${post.price || "0"}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/night</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(post);
                  }}
                  disabled={!post.isAvailable}
                  className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    post.isAvailable
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {post.isAvailable ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
