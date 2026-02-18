import { mongo } from "mongoose";
import UserService from "../service/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

class UserController {
  // ============ USERS ============
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      ApiResponse.success(res, "Users retrieved successfully", users);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      if (!mongo.Types.ObjectId.isValid(req.params.id)) {
        return ApiResponse.badRequest(res, "Invalid user ID format", 400);
      }
      const user = await UserService.getUserById(req.params.id);
      ApiResponse.success(res, "User retrieved successfully", user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(req, res, next) {
    try {
      const requiredFields = ["firstName", "lastName", "email"];
      const missing = requiredFields.filter(f => !req.body[f]);
      if (missing.length) {
        return ApiResponse.badRequest(res, `Missing: ${missing.join(", ")}`, 400);
      }
      const user = await UserService.createUser(req.body);
      ApiResponse.success(res, "User created successfully", user, 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      if (!mongo.Types.ObjectId.isValid(req.params.id)) {
        return ApiResponse.badRequest(res, "Invalid user ID format", 400);
      }
      const user = await UserService.updateUser(req.params.id, req.body);
      ApiResponse.success(res, "User updated successfully", user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      if (!mongo.Types.ObjectId.isValid(req.params.id)) {
        return ApiResponse.badRequest(res, "Invalid user ID format", 400);
      }
      await UserService.deleteUser(req.params.id);
      ApiResponse.success(res, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // ============ RESTAURANTS (Admin) ============
  static async createRestaurant(req, res, next) {
    try {
      if (!mongo.Types.ObjectId.isValid(req.params.userId)) {
        return ApiResponse.badRequest(res, "Invalid user ID", 400);
      }
      const required = ["name", "cuisine", "address", "city", "postalCode", "phone", "capacity"];
      const missing = required.filter(f => !req.body[f]);
      if (missing.length) {
        return ApiResponse.badRequest(res, `Missing: ${missing.join(", ")}`, 400);
      }
      const user = await UserService.createRestaurant(req.params.userId, req.body);
      ApiResponse.success(res, "Restaurant created", user, 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateRestaurant(req, res, next) {
    try {
      const { userId, restaurantId } = req.params;
      if (!mongo.Types.ObjectId.isValid(userId) || !mongo.Types.ObjectId.isValid(restaurantId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const user = await UserService.updateRestaurant(userId, restaurantId, req.body);
      ApiResponse.success(res, "Restaurant updated", user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRestaurant(req, res, next) {
    try {
      const { userId, restaurantId } = req.params;
      if (!mongo.Types.ObjectId.isValid(userId) || !mongo.Types.ObjectId.isValid(restaurantId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const user = await UserService.deleteRestaurant(userId, restaurantId);
      ApiResponse.success(res, "Restaurant deleted", user);
    } catch (error) {
      next(error);
    }
  }

  // ============ RESERVATIONS (Client) ============
  static async createReservation(req, res, next) {
    try {
      if (!mongo.Types.ObjectId.isValid(req.params.userId)) {
        return ApiResponse.badRequest(res, "Invalid user ID", 400);
      }
      const required = ["restaurantId", "restaurantName", "reservationDate", "reservationTime", "numberOfGuests"];
      const missing = required.filter(f => !req.body[f]);
      if (missing.length) {
        return ApiResponse.badRequest(res, `Missing: ${missing.join(", ")}`, 400);
      }
      const user = await UserService.createReservation(req.params.userId, req.body);
      ApiResponse.success(res, "Reservation created", user, 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const { userId, reservationId } = req.params;
      if (!mongo.Types.ObjectId.isValid(userId) || !mongo.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const user = await UserService.updateReservation(userId, reservationId, req.body);
      ApiResponse.success(res, "Reservation updated", user);
    } catch (error) {
      next(error);
    }
  }

  static async cancelReservation(req, res, next) {
    try {
      const { userId, reservationId } = req.params;
      if (!mongo.Types.ObjectId.isValid(userId) || !mongo.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const user = await UserService.cancelReservation(userId, reservationId);
      ApiResponse.success(res, "Reservation cancelled", user);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const { userId, reservationId } = req.params;
      if (!mongo.Types.ObjectId.isValid(userId) || !mongo.Types.ObjectId.isValid(reservationId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const user = await UserService.deleteReservation(userId, reservationId);
      ApiResponse.success(res, "Reservation deleted", user);
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
      const reservation = await UserService.getReservationByCode(code);
      ApiResponse.success(res, "Reservation found", reservation);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
