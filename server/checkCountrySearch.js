import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./src/models/Post.js";

dotenv.config();

const keywords = ["australia", "new zealand", "japan", "china", "india"];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const keyword of keywords) {
      const escapedKeyword = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const keywordRegex = new RegExp(escapedKeyword, "i");
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
      }).select("title hotelLocation");

      console.log(`\n${keyword.toUpperCase()} -> ${results.length} result(s)`);
      results.forEach((item) => console.log(`- ${item.title} | ${item.hotelLocation}`));
    }

    process.exit(0);
  } catch (error) {
    console.error("Search check failed:", error);
    process.exit(1);
  }
};

run();
