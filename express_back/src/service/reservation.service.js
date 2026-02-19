import ReservationRepository from "../repository/reservation.repository.js";
import RestaurantRepository from "../repository/restaurant.repository.js";

class ReservationService {
  static async getAllReservations() {
    return await ReservationRepository.findAll();
  }

  static async getReservationsByRestaurant(restaurantId) {
    return await ReservationRepository.findByRestaurant(restaurantId);
  }

  static async getReservationById(id) {
    const reservation = await ReservationRepository.findById(id);
    if (!reservation) throw new Error("Reservation not found");
    return reservation;
  }

  static async createReservation(data) {
    // expected fields: restaurant (id), customerName, date (YYYY-MM-DD), time (HH:mm), guests (number)
    if (!data.restaurant || !data.customerName || !data.date || !data.time || !data.guests) {
      throw new Error("Missing required reservation fields");
    }

    const restaurant = await RestaurantRepository.findById(data.restaurant);
    if (!restaurant) throw new Error("Restaurant not found");

    // get existing reservations for the same date
    const existing = await ReservationRepository.findByRestaurantAndDate(data.restaurant, data.date);
    const reservedGuests = existing.reduce((sum, r) => sum + (r.guests || 0), 0);
    if (reservedGuests + data.guests > restaurant.capacity) {
      throw new Error("Not enough capacity for the selected day");
    }

    // store reservation as subdocument in restaurant
    const created = await ReservationRepository.create(data.restaurant, {
      customerName: data.customerName,
      date: data.date,
      time: data.time,
      guests: data.guests,
      status: data.status || undefined,
    });
    return created;
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
