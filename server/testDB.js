import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./src/models/Post.js";
import Category from "./src/models/Category.js";

dotenv.config();

const testDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Get all categories
    const categories = await Category.find({});
    console.log("\n📊 Categories:", categories.map(c => ({ id: c._id, name: c.name })));

    // Get all hotels with populated categories
    const hotels = await Post.find({}).populate("category");
    console.log("\n🏨 Hotels with categories:");
    hotels.forEach(hotel => {
      console.log(`- ${hotel.title} (Category: ${hotel.category?.name || 'NO CATEGORY'})`);
    });

    // Group by category
    console.log("\n📈 Hotels by category:");
    categories.forEach(cat => {
      const hotelsInCategory = hotels.filter(h => h.category?._id.toString() === cat._id.toString());
      console.log(`${cat.name}: ${hotelsInCategory.length} hotels`);
      hotelsInCategory.forEach(h => console.log(`  - ${h.title}`));
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

testDatabase();
