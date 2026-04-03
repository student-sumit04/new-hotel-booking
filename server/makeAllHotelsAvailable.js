import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./src/models/Post.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const result = await Post.updateMany({}, { $set: { isAvailable: true } });
    const unavailableCount = await Post.countDocuments({ isAvailable: false });
    const totalCount = await Post.countDocuments({});

    console.log(`Matched: ${result.matchedCount}`);
    console.log(`Modified: ${result.modifiedCount}`);
    console.log(`Total hotels: ${totalCount}`);
    console.log(`Unavailable hotels: ${unavailableCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Failed to update availability:", error);
    process.exit(1);
  }
};

run();
