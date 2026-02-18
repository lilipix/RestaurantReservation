import UserRepository from "../repository/user.repository.js";

class UserService {
  // User Management
  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  static async getUsersByRole(role) {
    if (!["client", "admin"].includes(role)) {
      throw new Error("Invalid role");
    }
    return await UserRepository.findByRole(role);
  }

  static async createUser(userData) {
    const existing = await UserRepository.findByEmail(userData.email);
    if (existing) throw new Error("Email already exists");
    if (userData.age && userData.age < 0) throw new Error("Age must be positive");
    return await UserRepository.create(userData);
  }

  static async updateUser(id, userData) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    return await UserRepository.update(id, userData);
  }

  static async deleteUser(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    return await UserRepository.delete(id);
  }

  // Restaurant Management (Admin)
  static async createRestaurant(userId, restaurantData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can create restaurants");
    return await UserRepository.addRestaurant(userId, restaurantData);
  }

  static async updateRestaurant(userId, restaurantId, restaurantData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can update restaurants");
    const restaurant = user.restaurants.find(r => r._id.toString() === restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");
    return await UserRepository.updateRestaurant(userId, restaurantId, restaurantData);
  }

  static async deleteRestaurant(userId, restaurantId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.role !== "admin") throw new Error("Only admins can delete restaurants");
    const restaurant = user.restaurants.find(r => r._id.toString() === restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");
    return await UserRepository.deleteRestaurant(userId, restaurantId);
  }

  // Reservation Management (Client)
  static async createReservation(userId, reservationData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");

    const reservationDateTime = new Date(
      `${reservationData.reservationDate}T${reservationData.reservationTime}`
    );
    if (reservationDateTime <= new Date()) {
      throw new Error("Reservation date must be in the future");
    }

    return await UserRepository.addReservation(userId, reservationData);
  }

  static async updateReservation(userId, reservationId, reservationData) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const reservation = user.reservations.find(r => r._id.toString() === reservationId);
    if (!reservation) throw new Error("Reservation not found");
    return await UserRepository.updateReservation(userId, reservationId, reservationData);
  }

  static async cancelReservation(userId, reservationId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const reservation = user.reservations.find(r => r._id.toString() === reservationId);
    if (!reservation) throw new Error("Reservation not found");
    if (reservation.status === "cancelled") throw new Error("Already cancelled");
    return await UserRepository.updateReservation(userId, reservationId, {
      ...reservation.toObject(),
      status: "cancelled",
    });
  }

  static async deleteReservation(userId, reservationId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("User not found");
    const reservation = user.reservations.find(r => r._id.toString() === reservationId);
    if (!reservation) throw new Error("Reservation not found");
    return await UserRepository.deleteReservation(userId, reservationId);
  }

  static async getReservationByCode(code) {
    const user = await UserRepository.findReservationByCode(code);
    if (!user) throw new Error("Reservation not found");
    const reservation = user.reservations.find(r => r.confirmationCode === code);
    return reservation;
  }
}

export default UserService;
