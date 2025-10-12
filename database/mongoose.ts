import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

//we are using this global cache so that hot reload in development does not create a new connection

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  console.log(
    ` Connected to MongoDB: ${MONGODB_URI} in ${process.env.NODE_ENV}`
  );
};
