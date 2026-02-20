"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";
import RestaurantForm from "./RestaurantForm";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await RestaurantService.getAllRestaurants();
      setRestaurants(data || []);
    }
    fetchData();
  }, []);

  const handleFormSuccess = (restaurant: Restaurant) => {
    setRestaurants((prev) => {
      const index = prev.findIndex((r) => r._id === restaurant._id);
      if (index !== -1) {
        const newArr = [...prev];
        newArr[index] = restaurant;
        return newArr;
      }
      return [...prev, restaurant];
    });
    setShowForm(false);
    setEditingRestaurant(null);
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setShowForm(true);
  };

  const handleDelete = async (restaurant: Restaurant) => {
    const confirmed = confirm(`Supprimer le restaurant ${restaurant.name} ?`);
    if (!confirmed) return;

    const success = await RestaurantService.deleteRestaurant(restaurant._id);
    if (success) {
      setRestaurants((prev) => prev.filter((r) => r._id !== restaurant._id));
    } else {
      alert("Erreur lors de la suppression du restaurant.");
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Restaurants</h1>
          <button
            onClick={() => {
              setEditingRestaurant(null);
              setShowForm(true);
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Ajouter un restaurant
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <RestaurantForm
              initialData={editingRestaurant || {}}
              onSuccess={handleFormSuccess}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        {restaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun restaurant trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-1">📍 {restaurant.location}</p>
                <p className="text-gray-600 mb-1">📞 {restaurant.phone}</p>
                <p className="text-gray-600 mb-4">✉️ {restaurant.email}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(restaurant)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm hover:bg-blue-700"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}