import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const db = mongoose.connection.db;
    const collection = db.collection("users");
    const indexes = await collection.indexes();

    const clerkIndex = indexes.find((index) => index.name === "clerkId_1");

    if (!clerkIndex) {
      console.log("No clerkId_1 index found on users collection.");
      process.exit(0);
    }

    await collection.dropIndex("clerkId_1");
    console.log("Dropped stale clerkId_1 index from users collection.");

    const remainingIndexes = await collection.indexes();
    console.log("Remaining indexes:", remainingIndexes.map((index) => index.name));

    process.exit(0);
  } catch (error) {
    console.error("Failed to fix clerkId index:", error);
    process.exit(1);
  }
};

run();