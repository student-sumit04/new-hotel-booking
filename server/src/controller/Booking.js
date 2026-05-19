import Booking from "../models/Booking.js";
import Post from "../models/Post.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";

export const searchBookings = async (req, res) => {
  try {
    const { keyword } = req.params;
    const escapedKeyword = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const keywordRegex = new RegExp(escapedKeyword, "i");

    // Match title, description, hotel location and nearby areas.
    const results = await Post.find({
      $or: [
        { title: keywordRegex },
        { description: keywordRegex },
        { hotelLocation: keywordRegex },
        {
          nearArea: {
            $elemMatch: { $regex: escapedKeyword, $options: "i" },
          },
        },
      ],
    }).select("title hotelLocation images description isAvailable price guest rating slug");

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error("STRIPE_SECRET_KEY is not set in environment");
}
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description, customerName, customerAddress } =
      req.body;

    if (
      !amount ||
      !currency ||
      !description ||
      !customerName ||
      !customerAddress
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Amount, currency, description, customer name, and address are required",
      });
    }

    if (!stripeSecretKey) {
      return res.status(500).json({
        success: false,
        message: "Stripe secret key is not configured",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!stripeSecretKey) {
      return res.status(500).json({
        success: false,
        message: "Stripe secret key is not configured",
      });
    }

    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency,
      payment_method_types: ["card"],
      description,
      shipping: {
        name: customerName,
        address: {
          line1: customerAddress.line1,
          city: customerAddress.city,
          state: customerAddress.state,
          postal_code: customerAddress.postalCode,
          country: customerAddress.country,
        },
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment intent",
      error: error.message,
    });
  }
};

export const updateAvailability = async (req, res) => {
  const { postId, isAvailable } = req.body;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid postId format." });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { isAvailable },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { postId, bookingDate, transactionId } = req.body;

    if (!postId || !bookingDate || !transactionId) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required: postId, bookingDate, transactionId.",
      });
    }

    // Get userId from authenticated user (set by requireSignIn middleware)
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token.",
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    // Validate post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    // Create a new booking
    const booking = new Booking({
      user: userId, // Use the decoded userId here
      post: postId,
      bookingDate,
      transactionId,
      paymentStatus: "paid",
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("user post", "name title"); // Populate user and post details if needed
    return res.status(200).json({
      success: true,
      message: "All Bookings List",
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};
