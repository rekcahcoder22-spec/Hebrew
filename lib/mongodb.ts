import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}
const MONGODB_URI_SAFE: string = MONGODB_URI;

declare global {
  var _mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global._mongooseCache ?? { conn: null, promise: null };

if (!global._mongooseCache) {
  global._mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI_SAFE, {
        bufferCommands: false,
        dbName: "hebrew-store",
      })
      .then((m) => {
        console.log("✅ MongoDB connected");
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        console.error("❌ MongoDB connection error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
