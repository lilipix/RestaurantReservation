import { mongo } from "mongoose";
import ReservationService from "../service/reservation.service";
import ApiResponse from "../utils/apiResponse";

class ReservationController {
  static async getAllReservations(req, res, next) {
    try {
      const reservations = await ReservationService.getAllReservations();
      ApiResponse.success(res, "Reservations retrieved successfully", reservations);
    } catch (error) {
      next(error);
    }
  }

  static async getReservationById(req, res, next) {
    try {
      const id = req.params.id;
      const reservation = await ReservationService.getReservationById(id);
      ApiResponse.success(res, "Reservation retrieved successfully", reservation);
    } catch (error) {
      next(error);
    }
  }

  static async createReservation(req, res, next) {
    try {
      const newReservation = await ReservationService.createReservation(req.body);
      ApiResponse.success(res, "Reservation created successfully", newReservation);
    } catch (error) {
      next(error);
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const id = req.params.id;
      const to_update = req.body;
      if (id !== to_update._id) {
        return ApiResponse.badRequest(
          res,
          "Reservation ID in the URL does not match ID in the body",
          400,
        );
      }
      if (!mongo.Types.ObjectId.isValid(id)) {
        return ApiResponse.badRequest(res, "Invalid reservation ID format", 400);
      }
      const updated = await ReservationService.updateReservation(id, to_update);
      ApiResponse.success(res, "Reservation updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      await ReservationService.deleteReservation(req.params.id);
      ApiResponse.success(res, "Reservation deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default ReservationController;
