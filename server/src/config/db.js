import mongoose from "mongoose";

export const connectToDb = async () => {
  const uri = process.env.MONGODB_URI;
  const safeUri = uri ? uri.replace(/:\/\/([^:]+):([^@]+)@/, "://<redacted>:<redacted>@") : "MONGODB_URI not set";

  try {
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
