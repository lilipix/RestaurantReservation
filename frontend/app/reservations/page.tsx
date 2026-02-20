"use client";

import Link from "next/link";
import { useState } from "react";
import RestaurantService from "@/app/lib/restaurant.service";
import ReservationService from "@/app/lib/reservation.service";
import ReservationForm from "./ReservationForm";
import { Restaurant, Reservation } from "@/app/types";

async function fetchRestaurants(): Promise<Restaurant[]> {
  return await RestaurantService.getAllRestaurants();
}

export default function ReservationsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");

  // Charger les restaurants au montage
  useState(() => {
    fetchRestaurants().then(setRestaurants);
  }, []);

  const allReservations = restaurants.flatMap((restaurant) =>
    (restaurant.reservations || []).map((reservation) => ({
      ...reservation,
      restaurantId: restaurant._id,
      restaurantName: restaurant.name,
    }))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
            RestaurantApp
          </Link>
          <div className="space-x-4">
            <Link href="/restaurants" className="text-gray-600 hover:text-gray-900">Restaurants</Link>
            <Link href="/users" className="text-gray-600 hover:text-gray-900">Utilisateurs</Link>
            <Link href="/reservations" className="text-gray-600 hover:text-gray-900">Réservations</Link>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Réservations</h1>
          <div className="flex gap-2">
            <select
              value={selectedRestaurantId}
              onChange={(e) => setSelectedRestaurantId(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">Sélectionner un restaurant</option>
              {restaurants.map((resto) => (
                <option key={resto._id} value={resto._id}>{resto.name}</option>
              ))}
            </select>
            <button
              onClick={() => setShowForm(true)}
              disabled={!selectedRestaurantId}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Ajouter une réservation
            </button>
          </div>
        </div>

        {/* Formulaire */}
        {showForm && selectedRestaurantId && (
          <ReservationForm
            restaurantId={selectedRestaurantId}
            onSuccess={(newReservation) => {
              // Mettre à jour la liste locale
              const updatedRestaurants = restaurants.map((r) => {
                if (r._id === selectedRestaurantId) {
                  return { ...r, reservations: [...(r.reservations || []), newReservation] };
                }
                return r;
              });
              setRestaurants(updatedRestaurants);
              setShowForm(false);
            }}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Tableau des réservations */}
        {allReservations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune réservation trouvée</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 text-left">Restaurant</th>
                  <th className="p-4 text-left">Nom du client</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Heure</th>
                  <th className="p-4 text-left">Personnes</th>
                  <th className="p-4 text-left">Statut</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allReservations.map((reservation) => (
                  <tr key={reservation._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-semibold">{reservation.restaurantName}</td>
                    <td className="p-4">{reservation.customerName}</td>
                    <td className="p-4">{reservation.date}</td>
                    <td className="p-4">{reservation.time}</td>
                    <td className="p-4">{reservation.guests}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status || 'pending'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/restaurants/${reservation.restaurantId}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Voir
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}