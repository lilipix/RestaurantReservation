"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";
import RestaurantForm from "../RestaurantForm";

interface RestaurantDetailPageProps {
  params: {
    id: string;
  };
}

export default function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await RestaurantService.getRestaurantById(params.id);
      setRestaurant(data);
    }
    fetchData();
  }, [params.id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/restaurants" className="text-3xl font-bold text-orange-600">
              RestaurantApp
            </Link>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xl text-gray-600">Restaurant non trouvé</p>
          <Link href="/restaurants" className="text-orange-600 hover:underline mt-4 block">
            Retour aux restaurants
          </Link>
        </div>
      </div>
    );
  }

  const handleFormSuccess = (updatedRestaurant: Restaurant) => {
    setRestaurant(updatedRestaurant);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
            RestaurantApp
          </Link>
          <Link href="/restaurants" className="text-gray-600 hover:text-gray-900">
            ← Retour
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{restaurant.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-600 mb-2"><strong>📍 Localisation:</strong> {restaurant.location}</p>
              <p className="text-gray-600 mb-2"><strong>📞 Téléphone:</strong> {restaurant.phone}</p>
              <p className="text-gray-600 mb-2"><strong>✉️ Email:</strong> {restaurant.email}</p>
              <p className="text-gray-600 mb-2"><strong>🔑 ID:</strong> {restaurant.resto_id}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  const confirmed = confirm(`Supprimer le restaurant ${restaurant.name} ?`);
                  if (!confirmed) return;
                  const success = await RestaurantService.deleteRestaurant(restaurant._id);
                  if (success) window.location.href = "/restaurants";
                  else alert("Erreur lors de la suppression.");
                }}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>

          {/* Formulaire de modification */}
          {showForm && (
            <div className="mb-8">
              <RestaurantForm
                initialData={restaurant}
                onSuccess={handleFormSuccess}
                onClose={() => setShowForm(false)}
              />
            </div>
          )}

          {/* Menu */}
          {restaurant.menu && restaurant.menu.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Menu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.menu.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-orange-600 font-bold mt-2">{item.price} €</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Réservations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Réservations</h2>
            {restaurant.reservations && restaurant.reservations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2 text-left">Nom</th>
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Heure</th>
                      <th className="border p-2 text-left">Personnes</th>
                      <th className="border p-2 text-left">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurant.reservations.map((res) => (
                      <tr key={res._id} className="hover:bg-gray-50">
                        <td className="border p-2">{res.customerName}</td>
                        <td className="border p-2">{res.date}</td>
                        <td className="border p-2">{res.time}</td>
                        <td className="border p-2">{res.guests}</td>
                        <td className="border p-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            res.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            res.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>{res.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">Aucune réservation pour ce restaurant</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}