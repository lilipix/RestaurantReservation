"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RestaurantService from "@/app/lib/restaurant.service";

export default function CreateRestaurantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    borough: "",
    capacity: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === "capacity" ? parseInt(value) || "" : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.cuisine || !formData.borough) {
      setError("Tous les champs obligatoires doivent être remplis");
      setLoading(false);
      return;
    }

    const capacityNum = parseInt(formData.capacity as unknown as string);
    if (isNaN(capacityNum) || capacityNum < 1) {
      setError("La capacité doit être un nombre positif");
      setLoading(false);
      return;
    }

    try {
      const result = await RestaurantService.createRestaurant({
        ...formData,
        capacity: capacityNum,
        menu: {
          lastUpdate: new Date().toISOString(),
          categories: [],
        },
      } as any);
      
      if (result) {
        // Rediriger et forcer le recharge
        router.push("/restaurants");
        // Forcer un recharge de la page après un court délai
        setTimeout(() => {
          window.location.href = "/restaurants";
        }, 500);
      } else {
        setError("Erreur lors de la création du restaurant");
      }
    } catch (err) {
      setError("Erreur lors de la création du restaurant");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
            RestaurantApp
          </Link>
          <div className="space-x-4">
            <Link href="/restaurants" className="text-gray-600 hover:text-gray-900">
              Restaurants
            </Link>
            <Link href="/users" className="text-gray-600 hover:text-gray-900">
              Utilisateurs
            </Link>
            <Link href="/reservations" className="text-gray-600 hover:text-gray-900">
              Réservations
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Créer un restaurant</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Nom */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Nom du restaurant *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              placeholder="Le Petit Bistro"
            />
          </div>

          {/* Cuisine */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Type de cuisine *</label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              placeholder="Française"
            />
          </div>

          {/* Borough */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Quartier *</label>
            <input
              type="text"
              name="borough"
              value={formData.borough}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              placeholder="Marais"
            />
          </div>

          {/* Capacité */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Capacité (nombre de places) *</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
              placeholder="50"
            />
          </div>

          {/* Adresse */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">Adresse</h3>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Rue *</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="123 Rue de la Paix"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Ville *</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="Paris"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Code postal *</label>
              <input
                type="text"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="75000"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 font-bold"
            >
              {loading ? "Création..." : "Créer le restaurant"}
            </button>
            <Link
              href="/restaurants"
              className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-400 text-center font-bold"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
