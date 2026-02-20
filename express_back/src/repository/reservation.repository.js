import mongoose from "mongoose";
import RestaurantModel from "../model/restaurant.model.js";

class ReservationRepository {
  // Retourne toutes les réservations à plat avec infos restaurant
  static async findAll() {
    const restaurants = await RestaurantModel.find(
      {},
      { reservations: 1, name: 1 },
    );
    const all = [];
    restaurants.forEach((r) => {
      (r.reservations || []).forEach((res) => {
        all.push({
          ...res.toObject(),
          restaurant: { _id: r._id, name: r.name },
        });
      });
    });
    return all;
  }

  // Trouve une réservation par son _id dans les sous-documents
  static async findById(restaurantId, reservationId) {
    const restaurant = await RestaurantModel.findOne(
      {
        _id: new mongoose.Types.ObjectId(restaurantId),
        "reservations._id": new mongoose.Types.ObjectId(reservationId),
      },
      {
        "reservations.$": 1,
        name: 1,
      },
    );
    if (!restaurant || !restaurant.reservations.length) {
      return null;
    }
    const reservation = restaurant.reservations[0].toObject();
    return {
      ...reservation,
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
      },
    };
  }

  // Trouve les réservations d'un restaurant pour une date donnée (date string)
  static async findByRestaurantAndDate(restaurantId, dateString) {
    const restaurant = await RestaurantModel.findOne(
      { _id: restaurantId },
      { reservations: 1, name: 1 },
    );
    if (!restaurant) return [];
    return (restaurant.reservations || []).filter(
      (r) => r.date === dateString && r.status !== "cancelled",
    );
  }

  // Trouve toutes les réservations d'un restaurant
  static async findByRestaurant(restaurantId) {
    const restaurant = await RestaurantModel.findById(restaurantId, {
      reservations: 1,
      name: 1,
    });
    if (!restaurant) return [];
    return (restaurant.reservations || []).map((r) => ({
      ...r.toObject(),
      restaurant: { _id: restaurant._id, name: restaurant.name },
    }));
  }

  // Ajoute une réservation dans le tableau reservations du restaurant
  static async create(restaurantId, reservationData) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) return null;
    restaurant.reservations = restaurant.reservations || [];
    restaurant.reservations.push(reservationData);
    await restaurant.save();
    const added =
      restaurant.reservations[restaurant.reservations.length - 1].toObject();
    return {
      ...added,
      restaurant: { _id: restaurant._id, name: restaurant.name },
    };
  }

  // Met à jour une réservation imbriquée
  static async update(restaurantId, reservationId, updateData) {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) return null;
    const sub = restaurant.reservations.id(reservationId);
    if (!sub) return null;

    Object.assign(sub, updateData);

    await restaurant.save();

    return {
      ...sub.toObject(),
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
      },
    };
  }

  // Supprime une réservation imbriquée
  static async delete(reservationId) {
    const restaurant = await RestaurantModel.findOne({
      "reservations._id": reservationId,
    });
    if (!restaurant) return null;
    const sub = restaurant.reservations.id(reservationId);
    if (!sub) return null;
    sub.deleteOne();
    await restaurant.save();
    return true;
  }
}

export default ReservationRepository;
