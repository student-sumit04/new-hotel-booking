import express from "express";
import { submitContactMessage, listContactMessages } from "../controller/Contact.js";
import { requireSignIn, isAdmin } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/submit", submitContactMessage);
router.get("/messages", requireSignIn, isAdmin, listContactMessages);

export default router;
