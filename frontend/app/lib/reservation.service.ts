import axios from "axios";
import { ResponseApi, Reservation } from "@/app/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ReservationService = {
  // Créer une réservation pour un restaurant
  async createReservation(
    restaurantId: string,
    reservation: Omit<Reservation, "_id">,
  ): Promise<Reservation | null> {
    try {
      const response = await api.post<ResponseApi<Reservation>>(
        `/restaurants/${restaurantId}/reservations`,
        reservation,
      );
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la création de la réservation:`, error);
      return null;
    }
  },

  // Mettre à jour une réservation
  async updateReservation(
    restaurantId: string,
    reservationId: string,
    reservation: Partial<Reservation>,
  ): Promise<Reservation | null> {
    try {
      const response = await api.put<ResponseApi<Reservation>>(
        `/restaurants/${restaurantId}/reservations/${reservationId}`,
        reservation,
      );
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la réservation:`, error);
      return null;
    }
  },

  // Récupérer une réservation par ID
  async getReservationById(
    restaurantId: string,
    reservationId: string,
  ): Promise<Reservation | null> {
    try {
      const response = await api.get<ResponseApi<Reservation>>(
        `/restaurants/${restaurantId}/reservations/${reservationId}`,
      );
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la réservation:`, error);
      return null;
    }
  },
  // Supprimer une réservation
  async deleteReservation(
    restaurantId: string,
    reservationId: string,
  ): Promise<boolean> {
    try {
      await api.delete(
        `/restaurants/${restaurantId}/reservations/${reservationId}`,
      );
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la réservation:`, error);
      return false;
    }
  },
};

export default ReservationService;
