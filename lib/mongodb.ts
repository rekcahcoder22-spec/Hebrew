import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/** Fewer connections = less RAM on local Mongo (driver default is high). Override via .env.local if needed. */
const maxPoolSize = Math.min(
  50,
  Math.max(1, parseInt(process.env.MONGODB_MAX_POOL_SIZE || "5", 10) || 5),
);

declare global {
  // eslint-disable-next-line no-var
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
  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: "hebrew-store",
        maxPoolSize,
        minPoolSize: 0,
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
