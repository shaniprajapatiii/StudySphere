// server/src/utils/connectDB.js
import mongoose from "mongoose";

let cachedConnectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnectionPromise) {
    return cachedConnectionPromise;
  }

  try {
    cachedConnectionPromise = mongoose.connect(process.env.MONGO_URI);
    const conn = await cachedConnectionPromise;

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    cachedConnectionPromise = null;
    console.error("❌ MongoDB Connection Failed", error.message);
    throw error;
  }
};

export default connectDB;
