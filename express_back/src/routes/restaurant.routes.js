import express from "express";
import RestaurantController from "../controller/restaurant.controller.js";

const router = express.Router();

// Search routes MUST come before :id routes
router.get("/search/cuisine", RestaurantController.searchByCuisine);
router.get("/search/borough", RestaurantController.searchByBorough);

// Get all restaurants
router.get("/", RestaurantController.getAllRestaurants);

// Get restaurant by ID
router.get("/:id", RestaurantController.getRestaurantById);

// Create restaurant
router.post("/", RestaurantController.createRestaurant);

// Update restaurant
router.put("/:id", RestaurantController.updateRestaurant);

// Delete restaurant
router.delete("/:id", RestaurantController.deleteRestaurant);

// Add reservation to restaurant
router.post("/:id/reservations", RestaurantController.addReservation);

export default router;
