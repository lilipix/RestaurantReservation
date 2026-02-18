import RestaurantRepository from "../repository/restaurant.repository.js";

class RestaurantService {
  static async getAllRestaurants() {
    return await RestaurantRepository.findAll();
  }

  static async getRestaurantById(id) {
    const restaurant = await RestaurantRepository.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return restaurant;
  }

  static async createRestaurant(data) {
    // check unique name
    if (data.name) {
      const existing = await RestaurantRepository.findByName(data.name);
      if (existing) throw new Error("Restaurant name already exists");
    }
    if (!data.capacity || data.capacity < 1) {
      throw new Error("Capacity must be a positive number");
    }
    return await RestaurantRepository.create(data);
  }

  static async updateRestaurant(id, data) {
    const existing = await RestaurantRepository.findById(id);
    if (!existing) {
      throw new Error("Restaurant not found");
    }
    return await RestaurantRepository.update(id, data);
  }

  static async deleteRestaurant(id) {
    const existing = await RestaurantRepository.findById(id);
    if (!existing) {
      throw new Error("Restaurant not found");
    }
    return await RestaurantRepository.delete(id);
  }
}

export default RestaurantService;
