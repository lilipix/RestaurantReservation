import express from "express";
import {
  createReservationSchema,
  reservationIdSchema,
  updateReservationSchema,
} from "../validators/reservation.validation";
import validate from "../middlewares/validate.middleware";

const reservation_router = express.Router();

// use middleware validate to validate the id param and the request body for create, update and delete operations
const validateId = validate(reservationIdSchema, "params");
const validateCreate = validate(createReservationSchema, "body");
const validateUpdate = validate(updateReservationSchema, "body");

// Define routes for reservation operations, the id param should be defined before
reservation_router.get(
  "/:id",
  validateId,
  reservationController.getReservationById,
);
reservation_router.put(
  "/:id",
  validateUpdate,
  validateId,
  reservationController.updateReservation,
);
reservation_router.delete(
  "/:id",
  validateId,
  reservationController.deleteReservation,
);
reservation_router.get("/", reservationController.getAllReservations);
reservation_router.post(
  "/",
  validateCreate,
  reservationController.createReservation,
);

export default reservation_router;
