import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Restaurant from "./src/model/restaurant.model.js";

dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_INIT_DB } = process.env;

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017/${MONGO_INIT_DB}?authSource=admin`;

async function run() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("🔌 Connecté à MongoDB");

    const data = JSON.parse(
      fs.readFileSync("./dataset/restaurants.json", "utf-8"),
    );

    await Restaurant.deleteMany({});
    console.log("🗑 Anciennes données supprimées");

    await Restaurant.insertMany(data);
    console.log("✅ Import terminé via Mongoose");

    process.exit();
  } catch (error) {
    console.error("❌ Erreur :", error);
    process.exit(1);
  }
}

run();
