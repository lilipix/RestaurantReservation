import ReservationRepository from "../repository/reservation.repository.js";
import RestaurantRepository from "../repository/restaurant.repository.js";

class ReservationService {
  static async getAllReservations() {
    return await ReservationRepository.findAll();
  }

  static async getReservationsByRestaurant(restaurantId) {
    return await ReservationRepository.findByRestaurant(restaurantId);
  }

  static async getReservationById(restaurantId, reservationId) {
    return await ReservationRepository.findById(restaurantId, reservationId);
  }

  static async createReservation(data) {
    // expected fields: restaurant (id), customerName, date (YYYY-MM-DD), time (HH:mm), guests (number)
    if (
      !data.restaurant ||
      !data.customerName ||
      !data.date ||
      !data.time ||
      !data.guests
    ) {
      throw new Error("Missing required reservation fields");
    }

    const restaurant = await RestaurantRepository.findById(data.restaurant);
    if (!restaurant) throw new Error("Restaurant not found");

    const normalizedDate =
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : data.date;
    // get existing reservations for the same date
    const existing = await ReservationRepository.findByRestaurantAndDate(
      data.restaurant,
      normalizedDate,
    );
    const reservedGuests = existing.reduce(
      (sum, r) => sum + (r.guests || 0),
      0,
    );
    const guests = Number(data.guests);
    const capacity = Number(restaurant.capacity);
    if (reservedGuests + guests > capacity) {
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

  static async updateReservation(restaurantId, reservationId, data) {
    const existing = await ReservationRepository.findById(
      restaurantId,
      reservationId,
    );
    if (!existing) throw new Error("Reservation not found");
    return await ReservationRepository.update(
      restaurantId,
      reservationId,
      data,
    );
  }

  static async deleteReservation(restaurantId, reservationId) {
    const existing = await ReservationRepository.findById(
      restaurantId,
      reservationId,
    );
    if (!existing) throw new Error("Reservation not found");
    return await ReservationRepository.delete(reservationId);
  }
}

export default ReservationService;
