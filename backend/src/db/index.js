import mongoose from "mongoose";
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); // Google + Cloudflare DNS

import dotenv from 'dotenv';
dotenv.config();

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default dbConnection;
