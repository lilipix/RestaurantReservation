import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ApiResponse from "./src/utils/apiResponse.js";
import user_router from "./src/routes/user.routes.js";
import restaurant_router from "./src/routes/restaurant.routes.js";
import reservation_router from "./src/routes/reservation.routes.js";
import connectDb from "./src/config/database.js";

// Load environment variables from .env file
dotenv.config();
const EXPRESS_HOST = process.env.EXPRESS_HOST || "localhost";
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
export const MONGO_USER = process.env.MONGO_USER || "mongo_user";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example1234";
export const MONGO_INIT_DB = process.env.MONGO_INIT_DB || "express_db";
export const MONGO_HOST = process.env.MONGO_HOST || "localhost";
export const MONGO_PORT = process.env.MONGO_PORT || 27017;

// Construct MongoDB URI
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_INIT_DB}?authSource=admin`;

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom logger for requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Test database connection before starting the server
try {
  console.log("Mon URI:", MONGO_URI);
  await connectDb(MONGO_URI);
} catch (error) {
  console.error("Failed to connect to database:", error.message);
  process.exit(1);
}

// Add routes
app.get("/", (req, res) => {
  ApiResponse.success(res, "API Express + MongoDP op", {
    version: "1.0.0",
    endpoints: {
      users: `http://${EXPRESS_HOST}:${PORT}/api/users`,
      restaurants: `http://${EXPRESS_HOST}:${PORT}/api/restaurants`,
      reservations: `http://${EXPRESS_HOST}:${PORT}/api/reservations`,
      stats: `http://${EXPRESS_HOST}:${PORT}/api/stats`,
      mongoExpress: `http://${EXPRESS_HOST}:8081/`,
    },
  });
});

app.use("/api/users", user_router);
app.use("/api/restaurants", restaurant_router);
app.use("/api/reservations", reservation_router);
// Route 404 (par défaut, doit être après toutes les autres routes)
app.use((req, res) => {
  ApiResponse.notFound(res, "Endpoint not found");
});

// start server
app.listen(PORT, EXPRESS_HOST, () => {
  console.log(`Server running on on port ${PORT}/`);
  console.log(`Api: http://${EXPRESS_HOST}:${PORT}/`);
  console.log(`Mongo Express: http://${EXPRESS_HOST}:8081/`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// (optional) reaction to a change of state
// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  // await mongoose.disconnect();
  process.exit(0);
});
