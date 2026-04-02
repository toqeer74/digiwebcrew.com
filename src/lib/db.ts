import mongoose from "mongoose";

// Database Configuration - Graceful handling for development
const MONGODB_URI = process.env.MONGODB_URI;

// Development mode flag
const isDevelopment = process.env.NODE_ENV === 'development';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Avoid query buffering when a connection is unavailable.
mongoose.set("bufferCommands", false);

/**
 * Standard Database Connection Utility
 * Gracefully handles connection failures in development
 */
export async function connectToDatabase() {
  // If no MongoDB URI is configured, return null in development
  if (!MONGODB_URI) {
    if (isDevelopment) {
      console.warn("⚠️ MongoDB URI not configured. Running in database-less mode.");
      return null;
    }
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  // Return cached connection only when it is actually connected.
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  // Drop stale/disconnected cached connection and reconnect.
  if (cached.conn && cached.conn.readyState !== 1) {
    cached.conn = null;
    cached.promise = null;
  }

  // Create new connection promise if not exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose.connection;
    }).catch((error) => {
      console.error("❌ Database connection failed:", error.message);
      if (isDevelopment) {
        console.warn("⚠️ Continuing without database connection in development mode.");
        return null;
      }
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    if (isDevelopment) {
      console.warn("⚠️ Database connection failed, continuing in development mode.");
      return null;
    }
    throw e;
  }

  if (!cached.conn || cached.conn.readyState !== 1) {
    if (isDevelopment) {
      console.warn("⚠️ MongoDB not connected. Running in database-less mode.");
      return null;
    }
    throw new Error("MongoDB connection is not ready");
  }

  return cached.conn;
}

export const connectDB = connectToDatabase;
export default connectToDatabase;

