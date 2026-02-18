import RestaurantRepository from "../repository/restaurant.repository.js";
import UserRepository from "../repository/user.repository.js";

class RestaurantService {
  static async getAdminRestaurants(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can manage restaurants");
    return await RestaurantRepository.getAdminRestaurants(userId);
  }

  static async createRestaurant(userId, restaurantData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can create restaurants");
    return await RestaurantRepository.addRestaurant(userId, restaurantData);
  }

  static async updateRestaurant(userId, restaurantId, restaurantData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can update restaurants");
    const restaurant = user.restaurants.find(r => r._id.toString() === restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");
    return await RestaurantRepository.updateRestaurant(userId, restaurantId, restaurantData);
  }

  static async deleteRestaurant(userId, restaurantId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can delete restaurants");
    const restaurant = user.restaurants.find(r => r._id.toString() === restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");
    return await RestaurantRepository.deleteRestaurant(userId, restaurantId);
  }
}

export default RestaurantService;
