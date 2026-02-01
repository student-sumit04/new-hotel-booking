import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaChild } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ postDetails }) => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState("");

  const calculateTotalDays = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days * postDetails?.price || 0;
  };

  const handleBooking = () => {
    if (!auth?.token) {
      toast.error("Please login to make a booking");
      navigate("/login");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const totalGuests = adults + children;
    if (totalGuests > postDetails?.guest) {
      toast.error(`Maximum ${postDetails?.guest} guests allowed`);
      return;
    }

    if (!postDetails?.isAvailable) {
      toast.error("This property is not available");
      return;
    }

    // Navigate to payment with booking details
    navigate("/payment", {
      state: {
        price: calculateTotalPrice(),
        product: postDetails?.title,
        postId: postDetails?._id,
        bookingDetails: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults,
          children,
          totalDays: calculateTotalDays(),
          specialRequests,
        },
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Book Your Stay</h3>
        <p className="text-3xl font-bold text-blue-600">
          ${postDetails?.price}
          <span className="text-sm text-gray-500 font-normal">/night</span>
        </p>
      </div>

      <div className="space-y-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            <FaCalendarAlt className="inline mr-2" />
            Check-in
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            minDate={new Date()}
            dateFormat="MMM dd, yyyy"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select check-in date"
          />
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            <FaCalendarAlt className="inline mr-2" />
            Check-out
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            minDate={checkInDate || new Date()}
            dateFormat="MMM dd, yyyy"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholderText="Select check-out date"
          />
        </div>

        {/* Guests */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <FaUser className="inline mr-2" />
              Adults
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <FaChild className="inline mr-2" />
              Children
            </label>
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special requirements?"
          />
        </div>
      </div>

      {/* Pricing Summary */}
      {checkInDate && checkOutDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">
              ${postDetails?.price} × {calculateTotalDays()} nights
            </span>
            <span className="font-semibold">${calculateTotalPrice()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Service fee</span>
            <span className="font-semibold">$0</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-blue-600">
                ${calculateTotalPrice()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBooking}
        disabled={!postDetails?.isAvailable}
        className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition ${
          postDetails?.isAvailable
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {postDetails?.isAvailable ? "Reserve Now" : "Not Available"}
      </button>

      {postDetails?.isAvailable && (
        <p className="text-center text-sm text-gray-500 mt-3">
          You won't be charged yet
        </p>
      )}
    </div>
  );
};

export default BookingForm;
