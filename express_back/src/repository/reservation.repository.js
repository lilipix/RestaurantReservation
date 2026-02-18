import RestaurantModel from "../model/restaurant.model.js";

class ReservationRepository {
  static async findAll() {
    return await RestaurantModel.find().populate("restaurant user");
  }

  static async findById(id) {
    return await RestaurantModel.findById(id).populate("restaurant user");
  }

  static async findByRestaurantAndDay(restaurantId, dayStart, dayEnd) {
    return await RestaurantModel.find({
      restaurant: restaurantId,
      date: { $gte: dayStart, $lte: dayEnd },
      status: { $ne: "cancelled" },
    });
  }

  static async create(data) {
    return await ReservationModel.create(data);
  }

  static async update(id, data) {
    return await ReservationModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id) {
    return await ReservationModel.findByIdAndDelete(id);
  }
}

export default ReservationRepository;
