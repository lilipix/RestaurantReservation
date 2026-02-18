import RestaurantModel from "../model/restaurant.model";

class RestaurantRepository {
  static async findAll() {
    return await RestaurantModel.find();
  }

  static async findById(id) {
    return await RestaurantModel.findById(id);
  }

  static async findByName(name) {
    return await RestaurantModel.findOne({ name });
  }

  static async create(data) {
    return await RestaurantModel.create(data);
  }

  static async update(id, data) {
    return await RestaurantModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id) {
    return await RestaurantModel.findByIdAndDelete(id);
  }
}

export default RestaurantRepository;
