import axios from "axios";
import { ResponseApi, Restaurant } from "@/app/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const RestaurantService = {
  // Récupérer tous les restaurants
  async getAllRestaurants(): Promise<Restaurant[]> {
    try {
      const response = await api.get<ResponseApi<Restaurant[]>>("/restaurants");
      return response.data.data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des restaurants:", error);
      return [];
    }
  },

  // Récupérer un restaurant par ID
  async getRestaurantById(id: string): Promise<Restaurant | null> {
    try {
      const response = await api.get<ResponseApi<Restaurant>>(`/restaurants/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération du restaurant ${id}:`, error);
      return null;
    }
  },

  // Créer un nouveau restaurant
  async createRestaurant(restaurant: Omit<Restaurant, "_id">): Promise<Restaurant | null> {
    try {
      const response = await api.post<ResponseApi<Restaurant>>("/restaurants", restaurant);
      return response.data.data || null;
    } catch (error) {
      console.error("Erreur lors de la création du restaurant:", error);
      return null;
    }
  },

  // Mettre à jour un restaurant
  async updateRestaurant(id: string, restaurant: Partial<Restaurant>): Promise<Restaurant | null> {
    try {
      const response = await api.put<ResponseApi<Restaurant>>(`/restaurants/${id}`, restaurant);
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du restaurant ${id}:`, error);
      return null;
    }
  },

  // Supprimer un restaurant
  async deleteRestaurant(id: string): Promise<boolean> {
    try {
      await api.delete(`/restaurants/${id}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression du restaurant ${id}:`, error);
      return false;
    }
  },
};

export default RestaurantService;
