import UserModel from "../model/user.model.js";

class UserRepository {
  // User CRUD
  static async findAll() {
    return await UserModel.find({ isActive: true });
  }

  static async findById(id) {
    return await UserModel.findById(id);
  }

  static async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  static async findByRole(role) {
    return await UserModel.find({ role, isActive: true });
  }

  static async create(userData) {
    return await UserModel.create(userData);
  }

  static async update(id, userData) {
    return await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  static async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }

  // Restaurant operations (for admin users)
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

  // Reservation operations (for client users)
  static async addReservation(userId, reservationData) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $push: { reservations: reservationData } },
      { new: true }
    );
  }

  static async updateReservation(userId, reservationId, reservationData) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $set: { "reservations.$[elem]": reservationData } },
      {
        arrayFilters: [{ "elem._id": reservationId }],
        new: true,
        runValidators: true,
      }
    );
  }

  static async deleteReservation(userId, reservationId) {
    return await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { reservations: { _id: reservationId } } },
      { new: true }
    );
  }

  static async findReservationByCode(code) {
    return await UserModel.findOne({ "reservations.confirmationCode": code });
  }
}

export default UserRepository;
