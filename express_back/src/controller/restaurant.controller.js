import mongoose from "mongoose";
import RestaurantService from "../service/restaurant.service.js";
import ApiResponse from "../utils/apiResponse.js";

class RestaurantController {
  static async getAdminRestaurants(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return ApiResponse.badRequest(res, "Invalid user ID", 400);
      }
      const restaurants = await RestaurantService.getAdminRestaurants(req.params.userId);
      ApiResponse.success(res, "Restaurants retrieved", restaurants);
    } catch (error) {
      next(error);
    }
  }

  static async createRestaurant(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return ApiResponse.badRequest(res, "Invalid user ID", 400);
      }
      const required = ["name", "cuisine", "address", "city", "postalCode", "phone", "capacity"];
      const missing = required.filter(f => !req.body[f]);
      if (missing.length) {
        return ApiResponse.badRequest(res, `Missing: ${missing.join(", ")}`, 400);
      }
      const restaurants = await RestaurantService.createRestaurant(req.params.userId, req.body);
      ApiResponse.success(res, "Restaurant created", restaurants, 201);
    } catch (error) {
      next(error);
    }
  }

  static async updateRestaurant(req, res, next) {
    try {
      const { userId, restaurantId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(restaurantId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const restaurants = await RestaurantService.updateRestaurant(userId, restaurantId, req.body);
      ApiResponse.success(res, "Restaurant updated", restaurants);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRestaurant(req, res, next) {
    try {
      const { userId, restaurantId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(restaurantId)) {
        return ApiResponse.badRequest(res, "Invalid ID format", 400);
      }
      const restaurants = await RestaurantService.deleteRestaurant(userId, restaurantId);
      ApiResponse.success(res, "Restaurant deleted", restaurants);
    } catch (error) {
      next(error);
    }
  }
}

export default RestaurantController;
