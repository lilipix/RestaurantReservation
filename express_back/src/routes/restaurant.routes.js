import express from "express";
import {
  createRestaurantSchema,
  restaurantIdSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validation.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createReservationSchema,
  updateReservationSchema,
  reservationIdSchema,
} from "../validators/reservation.validation.js";
import ReservationController from "../controller/reservation.controller.js";
import RestaurantController from "../controller/restaurant.controller.js";

const restaurant_router = express.Router();

/* =========================
VALIDATIONS
========================= */
// use middleware validate to validate the id param and the request body for create, update and delete operations

const validateRestaurantId = validate(restaurantIdSchema, "params");
const validateCreateRestaurant = validate(createRestaurantSchema, "body");
const validateUpdateRestaurant = validate(updateRestaurantSchema, "body");

const validateReservationId = validate(reservationIdSchema, "params");
const validateCreateReservation = validate(createReservationSchema, "body");
const validateUpdateReservation = validate(updateReservationSchema, "body");

restaurant_router.get(
  "/reservations",
  ReservationController.getAllReservations,
);

restaurant_router.get("/", RestaurantController.getAllRestaurants);

restaurant_router.post(
  "/",
  validateCreateRestaurant,
  RestaurantController.createRestaurant,
);

restaurant_router.get(
  "/:id/reservations",
  validateRestaurantId,
  ReservationController.getReservationsByRestaurant,
);

restaurant_router.get(
  "/:id/reservations/:reservationId",
  validateReservationId,
  ReservationController.getReservationById,
);

restaurant_router.post(
  "/:id/reservations",
  validateRestaurantId,
  validateCreateReservation,
  ReservationController.createReservation,
);

restaurant_router.put(
  "/:id/reservations/:reservationId",
  validateReservationId,
  validateUpdateReservation,
  ReservationController.updateReservation,
);

restaurant_router.delete(
  "/:id/reservations/:reservationId",
  validateReservationId,
  ReservationController.deleteReservation,
);

restaurant_router.get(
  "/:id",
  validateRestaurantId,
  RestaurantController.getRestaurantById,
);

restaurant_router.put(
  "/:id",
  validateRestaurantId,
  validateUpdateRestaurant,
  RestaurantController.updateRestaurant,
);

restaurant_router.delete(
  "/:id",
  validateRestaurantId,
  RestaurantController.deleteRestaurant,
);

export default restaurant_router;
