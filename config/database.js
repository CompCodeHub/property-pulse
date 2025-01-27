import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If the database is already connected, return
  if (connected) {
    return;
  }

  // Connect to our database
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    return;
  }
};

export default connectDB;
