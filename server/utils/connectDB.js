// import 'dotenv/config';
import dns from 'dns';
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // dns.setServers(["1.1.1.1", "8.8.8.8"]);
    if (!process.env.MONGO) {
      throw new Error('MONGO environment variable is not set');
    }
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is connected successfully!");
  } catch (err) {
    console.error("MONGODB CONNECTION ERROR", err);
    throw err;
  }
};

export default connectDB;