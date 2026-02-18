import express from "express";
import {
  createRestaurantSchema,
  restaurantIdSchema,
  updateRestaurantSchema,
} from "../validators/restaurant.validation";

const restaurant_router = express.Router();

// use middleware validate to validate the id param and the request body for create, update and delete operations
const validateId = validate(restaurantIdSchema, "params");
const validateCreate = validate(createRestaurantSchema, "body");
const validateUpdate = validate(updateRestaurantSchema, "body");

// Define routes for restaurant operations, the id param should be defined before
restaurant_router.get(
  "/:id",
  validateId,
  RestaurantController.getRestaurantById,
);
restaurant_router.put(
  "/:id",
  validateUpdate,
  validateId,
  RestaurantController.updateRestaurant,
);
restaurant_router.delete(
  "/:id",
  validateId,
  RestaurantController.deleteRestaurant,
);
restaurant_router.get("/", RestaurantController.getAllRestaurants);
restaurant_router.post(
  "/",
  validateCreate,
  RestaurantController.createRestaurant,
);
export default restaurant_router;
