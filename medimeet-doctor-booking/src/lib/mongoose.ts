import mongoose from "mongoose";

// Read MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI as string;

// Check if connection string exists — fail early if missing
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global cached connection object.
 *
 * In development, Next.js does hot reloads and
 * this file might be imported multiple times.
 *
 * To prevent opening multiple connections to MongoDB,
 * we cache the connection globally.
 */
declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use the global cached connection or initialize it
const cached = global.mongooseConnection || { conn: null, promise: null };
/**
 * Function to connect to MongoDB using Mongoose.
 * It returns a Promise resolving to the mongoose connection.
 */
export async function connectDB() {
  // If connection is already established, reuse it
  if (cached.conn) {
    return cached.conn;
  }

  // If connection promise exists, wait for it
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "medimeet",
      })
      .then((mongoose) => {
        console.log("✅ [MongoDB] Connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ [MongoDB] Connection error:", error);
        throw error;
      });
  }

  // Await the promise and store the connection
  cached.conn = await cached.promise;

  // Save it to the global variable for caching in dev mode
  global.mongooseConnection = cached;

  return cached.conn;
}
