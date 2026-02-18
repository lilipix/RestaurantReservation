import express from "express";
import UserController from "../controller/user.controller.js";

const user_router = express.Router();

// ============ USERS ============
user_router.get("/", UserController.getAllUsers);
user_router.get("/:id", UserController.getUserById);
user_router.post("/", UserController.createUser);
user_router.put("/:id", UserController.updateUser);
user_router.delete("/:id", UserController.deleteUser);

// ============ RESTAURANTS (Admin) ============
user_router.post("/:userId/restaurants", UserController.createRestaurant);
user_router.put("/:userId/restaurants/:restaurantId", UserController.updateRestaurant);
user_router.delete("/:userId/restaurants/:restaurantId", UserController.deleteRestaurant);

// ============ RESERVATIONS (Client) ============
user_router.post("/:userId/reservations", UserController.createReservation);
user_router.put("/:userId/reservations/:reservationId", UserController.updateReservation);
user_router.put("/:userId/reservations/:reservationId/cancel", UserController.cancelReservation);
user_router.delete("/:userId/reservations/:reservationId", UserController.deleteReservation);
user_router.get("/search/code", UserController.getReservationByCode);

export default user_router;
