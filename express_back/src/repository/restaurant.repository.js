import UserModel from "../model/user.model.js";

class RestaurantRepository {
  static async getAdminRestaurants(userId) {
    const user = await UserModel.findById(userId);
    return user;
  }

  static async addRestaurant(userId, restaurantData) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { restaurants: restaurantData } },
      { new: true }
    );
  }

  static async updateRestaurant(userId, restaurantId, restaurantData) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $set: { "restaurants.$[elem]": restaurantData } },
      {
        arrayFilters: [{ "elem._id": restaurantId }],
        new: true,
        runValidators: true,
      }
    );
  }

  static async deleteRestaurant(userId, restaurantId) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { restaurants: { _id: restaurantId } } },
      { new: true }
    );
  }
}

export default RestaurantRepository;
