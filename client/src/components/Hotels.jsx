import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { useCart } from "../context/Cart";
import { toast } from "react-toastify";

const Hotels = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();

  // Fetch all posts
  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-post`
      );
      setPosts(res.data.products || res.data.posts || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Image rotation logic
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        posts.forEach((post) => {
          const currentIndex = newIndexes[post._id] || 0;
          newIndexes[post._id] = (currentIndex + 1) % post.images.length;
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  const handleBookNow = (hotel, e) => {
    e.stopPropagation();
    if (!auth?.token) {
      toast.error("Please login to book a hotel!");
      navigate("/login", { state: { from: `/product/${hotel.slug}` } });
      return;
    }
    navigate(`/product/${hotel.slug}`);
  };

  const handleAddToWishlist = (hotel, e) => {
    e.stopPropagation();
    
    const existingItem = cart.find((item) => item._id === hotel._id);
    if (existingItem) {
      toast.info("Already in wishlist!");
      return;
    }

    const updatedCart = [...cart, hotel];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to wishlist!");
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto mt-16 mb-16">
      <h2 className="text-3xl font-semibold mb-8 ml-[8rem]">Popular Hotels</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {posts.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 mx-4 cursor-pointer group"
            onClick={() => navigate(`/product/${hotel.slug}`)}
          >
            {/* Hotel Image with Overlay */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={hotel.images[imageIndexes[hotel._id] || 0]}
                alt={hotel.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Wishlist Button */}
              <button
                onClick={(e) => handleAddToWishlist(hotel, e)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
              >
                <FaHeart className="text-sm" />
              </button>

              {/* Availability Badge */}
              {hotel.isAvailable ? (
                <span className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Available
                </span>
              ) : (
                <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Unavailable
                </span>
              )}

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Hotel Details */}
            <div className="p-4">
              <Link
                to={`/product/${hotel.slug}`}
                className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors block mb-2"
              >
                {hotel.title}
              </Link>
              
              {/* Location */}
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <FaMapMarkerAlt className="mr-1 text-blue-500" />
                <span className="truncate">{hotel.hotelLocation}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 text-yellow-500 mb-3">
                <FaStar className="text-sm" />
                <span className="text-gray-700 font-semibold text-sm ml-1">
                  {hotel.rating || "4.5"}
                </span>
                <span className="text-gray-500 text-xs">(Reviews)</span>
              </div>

              {/* Price and Book Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <span className="text-xl font-bold text-blue-600">
                    ${hotel.price}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">/night</span>
                </div>
                <button
                  onClick={(e) => handleBookNow(hotel, e)}
                  disabled={!hotel.isAvailable}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    hotel.isAvailable
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {hotel.isAvailable ? "Book Now" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hotels;
