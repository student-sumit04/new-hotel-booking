import express from "express";
import {
  createBooking,
  createPaymentIntent,
  getBookings,
  searchBookings,
  updateAvailability,
} from "../controller/Booking.js";
import { requireSignIn } from "../middlewares/Auth.js";
const router = express.Router();

router.get("/search/:keyword", searchBookings);
router.post("/create-payment-intent", createPaymentIntent);
router.patch("/update-availability", requireSignIn, updateAvailability);
router.post("/create-booking", requireSignIn, createBooking);
router.get("/get-all-bookings", getBookings);

export default router;
