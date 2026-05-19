import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  const safeUri = uri
    ? uri.replace(/:\/\/([^:]+):([^@]+)@/, "://<redacted>:<redacted>@")
    : "MONGODB_URI not set";

  try {
    if (!uri) throw new Error("MONGODB_URI not provided");
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", {
      message: error.message,
      name: error.name,
      code: error.code,
      reason: error.reason,
      uri: safeUri,
      stack: error.stack,
    });

    // If the failure looks like an Atlas SRV DNS/ENOTFOUND issue, fall back to an in-memory MongoDB for local testing
    if (
      error.code === "ENOTFOUND" ||
      (error.message && error.message.includes("querySrv ENOTFOUND"))
    ) {
      console.warn("Falling back to in-memory MongoDB (mongodb-memory-server)");
      try {
        const mongod = await MongoMemoryServer.create();
        const memUri = mongod.getUri();
        await mongoose.connect(memUri);
        console.log("Connected to in-memory MongoDB");
        // Keep process running with in-memory DB
        return;
      } catch (memErr) {
        console.error("Failed to start in-memory MongoDB:", memErr);
        process.exit(1);
      }
    }

    process.exit(1);
  }

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", {
      message: error.message,
      name: error.name,
      code: error.code,
      reason: error.reason,
      stack: error.stack,
    });
  });
};
