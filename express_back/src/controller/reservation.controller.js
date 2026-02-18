import mongoose from "mongoose";
import ReservationService from "../service/reservation.service.js";
import ApiResponse from "../utils/apiResponse.js";

class ReservationController {
  static async getClientReservations(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return ApiResponse.badRequest(res, "Invalid user ID", 400);
      }
      const reservations = await ReservationService.getClientReservations(req.params.userId);
      ApiResponse.success(res, "Reservations retrieved", reservations);
    } catch (error) {
      next(error);
    }
  }

  static async createReservation(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return ApiResponse.badRequest(res, "Invalid user ID", 400);
      }
      const required = ["restaurantId", "restaurantName", "reservationDate", "reservationTime", "numberOfGuests"];
      const missing = required.filter(f => !req.body[f]);
      if (missing.length) {
        return ApiResponse.badRequest(res, `Missing: ${missing.join(", ")}`, 400);
      }
      const reservations = await ReservationService.createReservation(req.params.userId, req.body);
      ApiResponse.success(res, "Reservation created", reservations, 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const { userId, reservationId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const reservations = await ReservationService.updateReservation(userId, reservationId, req.body);
      ApiResponse.success(res, "Reservation updated", reservations);
    } catch (error) {
      next(error);
    }
  }

  static async cancelReservation(req, res, next) {
    try {
      const { userId, reservationId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const reservations = await ReservationService.cancelReservation(userId, reservationId);
      ApiResponse.success(res, "Reservation cancelled", reservations);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const { userId, reservationId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const reservations = await ReservationService.deleteReservation(userId, reservationId);
      ApiResponse.success(res, "Reservation deleted", reservations);
    } catch (error) {
      next(error);
    }
  }

  static async getReservationByCode(req, res, next) {
    try {
      const { code } = req.query;
      if (!code) {
        return ApiResponse.badRequest(res, "Code required", 400);
      }
      const reservation = await ReservationService.getReservationByCode(code);
      ApiResponse.success(res, "Reservation found", reservation);
    } catch (error) {
      next(error);
    }
  }
}

export default ReservationController;
