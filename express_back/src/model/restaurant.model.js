import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Schema pour les items du menu
const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

// Schema pour les catégories du menu
const CategorySchema = new Schema({
  name: { type: String, required: true },
  items: [MenuItemSchema],
});

// Schema pour le menu
const MenuSchema = new Schema({
  lastUpdate: { type: Date, default: Date.now },
  categories: [CategorySchema],
});

// Schema pour les réservations
const ReservationSchema = new Schema({
  customerName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
});

// Schema principal pour le restaurant
const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  borough: { type: String, required: true },
  capacity: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },
  menu: MenuSchema,
  reservations: [ReservationSchema],
});

// Export du modèle
export default model("Restaurant", RestaurantSchema);
