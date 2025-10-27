import "dotenv/config";
import mongoose from "mongoose";

export const connectMongo = async () => {
  const uri =
    process.env.MONGO_URL +
    process.env.MONGO_DATABASE +
    process.env.MONGO_OPTIONS;
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
