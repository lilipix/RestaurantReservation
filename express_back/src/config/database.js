import mongoose from "mongoose";

async function connectDb(mongoUri) {
  try {
    // optional, but it is recommended to set strictQuery to false to avoid deprecation warnings
    mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(mongoUri, {
      // don't use timeout 5000 in production, it is only for development
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully:", connection.connection.host);
    console.log("Database name:", connection.connection.name);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
}

// Listen for connection events
mongoose.connection.on("disconnected", () => {
  console.warn("Database disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

export default connectDb;
