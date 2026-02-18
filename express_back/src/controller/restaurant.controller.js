import mongoose from "mongoose";
import RestaurantService from "../service/restaurant.service.js";
import ApiResponse from "../utils/apiResponse.js";

// Controller for restaurant-related HTTP endpoints. Delegates business logic to the service layer.
class RestaurantController {
  static async getAllRestaurants(req, res, next) {
    try {
      const restaurants = await RestaurantService.getAllRestaurants();
      ApiResponse.success(
        res,
        "Restaurants retrieved successfully",
        restaurants,
      );
    } catch (error) {
      next(error);
    }
  }

  static async getRestaurantById(req, res, next) {
    try {
      const restaurant_id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(restaurant_id)) {
        return ApiResponse.badRequest(res, "Invalid restaurant ID format");
      }
      const restaurant =
        await RestaurantService.getRestaurantById(restaurant_id);
      ApiResponse.success(res, "Restaurant retrieved successfully", restaurant);
    } catch (error) {
      next(error);
    }
  }

  static async createRestaurant(req, res, next) {
    try {
      const body = req.body || {};
      if (!body.name) return ApiResponse.badRequest(res, "Name is required");
      if (
        !body.capacity ||
        typeof body.capacity !== "number" ||
        body.capacity < 1
      )
        return ApiResponse.badRequest(
          res,
          "Capacity must be a positive number",
        );

      const newRestaurant = await RestaurantService.createRestaurant(body);
      ApiResponse.created(
        res,
        "Restaurant created successfully",
        newRestaurant,
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateRestaurant(req, res, next) {
    try {
      const restaurant_id = req.params.id;
      const to_update_data = req.body;
      if (restaurant_id !== String(to_update_data._id)) {
        return ApiResponse.badRequest(
          res,
          "Restaurant ID in the URL does not match ID in the body",
        );
      }
      if (!mongoose.Types.ObjectId.isValid(restaurant_id)) {
        return ApiResponse.badRequest(res, "Invalid restaurant ID format");
      }
      const updatedRestaurant = await RestaurantService.updateRestaurant(
        restaurant_id,
        to_update_data,
      );
      ApiResponse.success(
        res,
        "Restaurant updated successfully",
        updatedRestaurant,
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteRestaurant(req, res, next) {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponse.badRequest(res, "Invalid restaurant ID format");
      }
      await RestaurantService.deleteRestaurant(id);
      ApiResponse.success(res, "Restaurant deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default RestaurantController;
