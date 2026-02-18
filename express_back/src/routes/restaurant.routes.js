import express from "express";
import {
  createRestaurantSchema,
  restaurantIdSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validation";
import validate from "../middlewares/validate.middleware";
import RestaurantController from "../controllers/restaurant.controller.js";

import {
  createReservationSchema,
  updateReservationSchema,
  reservationIdSchema,
} from "../validators/reservation.validation";
import ReservationController from "../controllers/reservation.controller.js";

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

/* =========================
RESTAURANT ROUTES
========================= */

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

restaurant_router.get("/", RestaurantController.getAllRestaurants);

restaurant_router.post(
  "/",
  validateCreateRestaurant,
  RestaurantController.createRestaurant,
);

/* =========================
RESERVATION ROUTES
========================= */

restaurant_router.post(
  "/:id/reservations",
  validateRestaurantId,
  validateCreateReservation,
  ReservationController.createReservation,
);

restaurant_router.put(
  "/:id/reservations/:reservationId",
  validateRestaurantId,
  validateReservationId,
  validateUpdateReservation,
  ReservationController.updateReservation,
);

restaurant_router.delete(
  "/:id/reservations/:reservationId",
  validateRestaurantId,
  validateReservationId,
  ReservationController.deleteReservation,
);

export default restaurant_router;
