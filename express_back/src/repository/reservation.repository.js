import UserModel from "../model/user.model.js";

class ReservationRepository {
  static async getClientReservations(userId) {
    const user = await UserModel.findById(userId);
    return user;
  }

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

export default ReservationRepository;
