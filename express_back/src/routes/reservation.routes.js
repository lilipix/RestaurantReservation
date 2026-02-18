import express from "express";
import ReservationController from "../controller/reservation.controller.js";

const router = express.Router();

router.get("/client/:userId", ReservationController.getClientReservations);
router.post("/client/:userId", ReservationController.createReservation);
router.put("/client/:userId/:reservationId", ReservationController.updateReservation);
router.patch("/client/:userId/:reservationId/cancel", ReservationController.cancelReservation);
router.delete("/client/:userId/:reservationId", ReservationController.deleteReservation);
router.get("/code", ReservationController.getReservationByCode);

export default router;
