import mongoose from "mongoose";
import ReservationService from "../service/reservation.service.js";
import ApiResponse from "../utils/apiResponse.js";

class ReservationController {
  static async getAllReservations(req, res, next) {
    try {
      const reservations = await ReservationService.getAllReservations();
      ApiResponse.success(
        res,
        "Reservations retrieved successfully",
        reservations,
      );
    } catch (error) {
      next(error);
    }
  }

  static async getReservationsByRestaurant(req, res, next) {
    try {
      const restaurantId = req.params.id;
      const reservations = await ReservationService.getReservationsByRestaurant(restaurantId);
      ApiResponse.success(res, "Reservations retrieved for restaurant", reservations);
    } catch (error) {
      next(error);
    }
  }

  static async getReservationById(req, res, next) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponse.badRequest(res, "Invalid reservation ID format");
      }
      const reservation = await ReservationService.getReservationById(id);
      ApiResponse.success(
        res,
        "Reservation retrieved successfully",
        reservation,
      );
    } catch (error) {
      next(error);
    }
  }

  static async createReservation(req, res, next) {
    try {
      const body = req.body || {};
      // if route is nested under /:id/reservations use params.id as restaurant id
      if (req.params && req.params.id) body.restaurant = req.params.id;
      if (!body.restaurant) return ApiResponse.badRequest(res, "restaurant is required");
      if (!body.customerName) return ApiResponse.badRequest(res, "customerName is required");
      if (!body.date) return ApiResponse.badRequest(res, "date is required (YYYY-MM-DD)");
      if (!body.time) return ApiResponse.badRequest(res, "time is required (HH:mm)");
      if (!body.guests || typeof body.guests !== "number" || body.guests < 1)
        return ApiResponse.badRequest(res, "guests must be a positive number");

      const newReservation = await ReservationService.createReservation(body);
      ApiResponse.created(res, "Reservation created successfully", newReservation);
    } catch (error) {
      next(error);
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const restaurantId = req.params.id;
      const reservationId = req.params.reservationId;
      const to_update = req.body;
      if (reservationId !== to_update._id) {
        return ApiResponse.badRequest(res, "Reservation ID in the URL does not match ID in the body");
      }
      if (!mongoose.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid reservation ID format");
      }
      // optional: ensure reservation belongs to restaurant
      const existing = await ReservationService.getReservationById(reservationId);
      if (!existing) return ApiResponse.notFound(res, "Reservation not found");
      if (String(existing.restaurant._id) !== String(restaurantId)) {
        return ApiResponse.badRequest(res, "Reservation does not belong to the specified restaurant");
      }
      const updated = await ReservationService.updateReservation(reservationId, to_update);
      ApiResponse.success(res, "Reservation updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const restaurantId = req.params.id;
      const reservationId = req.params.reservationId;
      if (!mongoose.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid reservation ID format");
      }
      const existing = await ReservationService.getReservationById(reservationId);
      if (!existing) return ApiResponse.notFound(res, "Reservation not found");
      if (String(existing.restaurant._id) !== String(restaurantId)) {
        return ApiResponse.badRequest(res, "Reservation does not belong to the specified restaurant");
      }
      await ReservationService.deleteReservation(reservationId);
      ApiResponse.success(res, "Reservation deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default ReservationController;
