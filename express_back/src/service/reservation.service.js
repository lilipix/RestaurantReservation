import ReservationRepository from "../repository/reservation.repository";
import RestaurantRepository from "../repository/restaurant.repository";

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

class ReservationService {
  static async getAllReservations() {
    return await ReservationRepository.findAll();
  }

  static async getReservationById(id) {
    const reservation = await ReservationRepository.findById(id);
    if (!reservation) throw new Error("Reservation not found");
    return reservation;
  }

  static async createReservation(data) {
    if (!data.restaurant || !data.date || !data.covers) {
      throw new Error("Missing required reservation fields");
    }

    const restaurant = await RestaurantRepository.findById(data.restaurant);
    if (!restaurant) throw new Error("Restaurant not found");

    const dayStart = startOfDay(data.date);
    const dayEnd = endOfDay(data.date);
    const existing = await ReservationRepository.findByRestaurantAndDay(
      data.restaurant,
      dayStart,
      dayEnd,
    );
    const reservedCovers = existing.reduce((sum, r) => sum + (r.covers || 0), 0);
    if (reservedCovers + data.covers > restaurant.capacity) {
      throw new Error("Not enough capacity for the selected day");
    }

    return await ReservationRepository.create(data);
  }

  static async updateReservation(id, data) {
    const existing = await ReservationRepository.findById(id);
    if (!existing) throw new Error("Reservation not found");
    return await ReservationRepository.update(id, data);
  }

  static async deleteReservation(id) {
    const existing = await ReservationRepository.findById(id);
    if (!existing) throw new Error("Reservation not found");
    return await ReservationRepository.delete(id);
  }
}

export default ReservationService;
