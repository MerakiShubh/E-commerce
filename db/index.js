import mongoose from "mongoose";
import { DB_NAME } from "../contants";
import { MONOGODB_URI } from "../config";

const connectDB = async () => {
  try {
    const connectionInsatance = await mongoose.connect(
      `${MONOGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInsatance.connect.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
