import axios from "axios";
import { ResponseApi, User } from "@/app/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const UserService = {
  // Récupérer tous les utilisateurs
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<ResponseApi<User[]>>("/users");
      return response.data.data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return [];
    }
  },

  // Récupérer un utilisateur par ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await api.get<ResponseApi<User>>(`/users/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
  },

  // Créer un nouvel utilisateur
  async createUser(user: Omit<User, "_id">): Promise<User | null> {
    try {
      const response = await api.post<ResponseApi<User>>("/users", user);
      return response.data.data || null;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return null;
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    try {
      const response = await api.put<ResponseApi<User>>(`/users/${id}`, user);
      return response.data.data || null;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      return null;
    }
  },

  // Supprimer un utilisateur
  async deleteUser(id: string): Promise<boolean> {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      return false;
    }
  },
};

export default UserService;
