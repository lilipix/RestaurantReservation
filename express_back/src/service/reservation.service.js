import ReservationRepository from "../repository/reservation.repository.js";
import UserRepository from "../repository/user.repository.js";

class ReservationService {
  static async getClientReservations(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return await ReservationRepository.getClientReservations(userId);
  }

  static async createReservation(userId, reservationData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const reservationDateTime = new Date(
      `${reservationData.reservationDate}T${reservationData.reservationTime}`
    );
    if (reservationDateTime <= new Date()) {
      throw new Error("Reservation date must be in the future");
    }

    return await ReservationRepository.addReservation(userId, reservationData);
  }

  static async updateReservation(userId, reservationId, reservationData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const reservation = user.reservations.find(r => r._id.toString() === reservationId);
    if (!reservation) throw new Error("Reservation not found");
    return await ReservationRepository.updateReservation(userId, reservationId, reservationData);
  }

  static async cancelReservation(userId, reservationId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const reservation = user.reservations.find(r => r._id.toString() === reservationId);
    if (!reservation) throw new Error("Reservation not found");
    if (reservation.status === "cancelled") throw new Error("Already cancelled");
    return await ReservationRepository.updateReservation(userId, reservationId, {
      ...reservation.toObject(),
      status: "cancelled",
    });
  }

  static async deleteReservation(userId, reservationId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const reservation = user.reservations.find(r => r._id.toString() === reservationId);
    if (!reservation) throw new Error("Reservation not found");
    return await ReservationRepository.deleteReservation(userId, reservationId);
  }

  static async getReservationByCode(code) {
    const user = await ReservationRepository.findReservationByCode(code);
    if (!user) throw new Error("Reservation not found");
    const reservation = user.reservations.find(r => r.confirmationCode === code);
    return reservation;
  }
}

export default ReservationService;
