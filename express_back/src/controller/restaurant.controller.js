import { mongo } from "mongoose";
import UserService from "../service/user.service";
import ApiResponse from "../utils/apiResponse";

// The controller is responsible for handling incoming HTTP requests, calling the appropriate service methods, and sending back HTTP responses. It acts as a bridge between the routes and the service layer. It receives the request, extracts any necessary parameters or body data, calls the corresponding service method, and then formats the response to be sent back to the client. The controller should not contain business logic; it should delegate that to the service layer. It can also handle any necessary error handling and response formatting before sending the response back to the client.
class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      ApiResponse.success(res, "Users retrieved successfully", users);
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  static async getUserById(req, res, next) {
    try {
      const user_id = req.params.id;
      const user = await UserService.getUserById(user_id);
      ApiResponse.success(res, "User retrieved successfully", user);
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }

  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body);
      ApiResponse.success(res, "User created successfully", newUser);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user_id = req.params.id;
      const to_update_data = req.body;
      // control
      if (user_id !== to_update_data._id) {
        return ApiResponse.badRequest(
          res,
          "User ID in the URL does not match ID in the body",
          400,
        );
      }
      if (!mongo.Types.ObjectId.isValid(user_id)) {
        return ApiResponse.badRequest(res, "Invalid user ID format", 400);
      }
      const updatedUser = await UserService.updateUser(user_id, to_update_data);
      ApiResponse.success(res, "User updated successfully", updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      ApiResponse.success(res, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
