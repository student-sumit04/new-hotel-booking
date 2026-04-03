import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./src/models/Category.js";
import Post from "./src/models/Post.js";

dotenv.config();

const categorySeed = [
  { name: "Luxury Hotels", slug: "luxury-hotels" },
  { name: "Business Hotels", slug: "business-hotels" },
  { name: "Boutique Hotels", slug: "boutique-hotels" },
  { name: "Resort Hotels", slug: "resort-hotels" },
  { name: "Budget Hotels", slug: "budget-hotels" },
];

const hotelToCategory = {
  "The Grand Taj Palace Mumbai": "Luxury Hotels",
  "Oberoi Udaipur Palace": "Business Hotels",
  "The Leela Beach Resort Goa": "Boutique Hotels",
  "ITC Maurya New Delhi": "Resort Hotels",
  "Wildflower Hall Shimla Resort": "Budget Hotels",
  "Taj View Hotel Agra": "Luxury Hotels",
  "Kumarakom Lake Resort Kerala": "Business Hotels",
  "The Park Boutique Hotel Bangalore": "Boutique Hotels",
  "Rambagh Palace Hotel Jaipur": "Resort Hotels",
  "Budget Inn Heritage Kolkata": "Budget Hotels",
};

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const recoverCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const categoryDocs = {};
    for (const category of categorySeed) {
      const doc = await Category.findOneAndUpdate(
        { name: category.name },
        { $set: { slug: category.slug } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      categoryDocs[category.name] = doc;
    }

    console.log(`Upserted ${Object.keys(categoryDocs).length} categories`);

    const posts = await Post.find({});
    let updatedCount = 0;
    const skipped = [];

    for (const post of posts) {
      const matchedTitle = Object.keys(hotelToCategory).find(
        (seedTitle) => normalize(seedTitle) === normalize(post.title)
      );

      if (!matchedTitle) {
        skipped.push(post.title);
        continue;
      }

      const categoryName = hotelToCategory[matchedTitle];
      const categoryId = categoryDocs[categoryName]?._id;

      if (!categoryId) {
        skipped.push(post.title);
        continue;
      }

      await Post.updateOne({ _id: post._id }, { $set: { category: categoryId } });
      updatedCount += 1;
    }

    console.log(`Relinked ${updatedCount} hotels to categories`);

    if (skipped.length > 0) {
      console.log("Skipped hotels (no title mapping found):");
      skipped.forEach((title) => console.log(`- ${title}`));
    }

    const categories = await Category.find({}).sort({ name: 1 });
    const hotels = await Post.find({}).populate("category");

    console.log("\nCurrent categories:");
    categories.forEach((cat) => console.log(`- ${cat.name} (${cat.slug})`));

    console.log("\nHotels with categories:");
    hotels.forEach((hotel) => {
      console.log(`- ${hotel.title} -> ${hotel.category?.name || "NO CATEGORY"}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Recovery failed:", error);
    process.exit(1);
  }
};

recoverCategories();
