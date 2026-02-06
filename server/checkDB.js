import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./src/models/Category.js";
import Post from "./src/models/Post.js";

dotenv.config();

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB\n");

    // Get all categories
    const categories = await Category.find({});
    console.log(" CATEGORIES IN DATABASE:");
    console.log("Total:", categories.length);
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (ID: ${cat._id}) - slug: ${cat.slug}`);
    });

    console.log("\n HOTELS IN DATABASE:");
    const hotels = await Post.find({}).populate("category");
    console.log("Total:", hotels.length);
    hotels.forEach((hotel, index) => {
      console.log(`\n${index + 1}. ${hotel.title}`);
      console.log(`   Location: ${hotel.hotelLocation}`);
      console.log(`   Category: ${hotel.category?.name || "NO CATEGORY"} (ID: ${hotel.category?._id || "NULL"})`);
      console.log(`   Available: ${hotel.isAvailable}`);
      console.log(`   Price: $${hotel.price}`);
      console.log(`   Slug: ${hotel.slug}`);
    });

    // Check for hotels without categories
    const hotelsWithoutCategory = hotels.filter(h => !h.category);
    if (hotelsWithoutCategory.length > 0) {
      console.log("\n HOTELS WITHOUT CATEGORY:");
      hotelsWithoutCategory.forEach(h => console.log(`   - ${h.title}`));
    }

    // Check category distribution
    console.log("\n CATEGORY DISTRIBUTION:");
    categories.forEach(cat => {
      const count = hotels.filter(h => h.category?._id?.toString() === cat._id.toString()).length;
      console.log(`   ${cat.name}: ${count} hotels`);
    });

    process.exit(0);
  } catch (error) {
    console.error(" Error:", error);
    process.exit(1);
  }
};

checkDatabase();
