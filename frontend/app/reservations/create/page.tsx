"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReservationService from "@/app/lib/reservation.service";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant, ReservationStatus } from "@/app/types";

export default function CreateReservationPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    restaurantId: "",
    customerName: "",
    date: "",
    time: "",
    guests: 1,
    status: "confirmed",
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      const data = await RestaurantService.getAllRestaurants();
      setRestaurants(data || []);
    };
    fetchRestaurants();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "guests" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await ReservationService.createReservation(
      formData.restaurantId,
      {
        customerName: formData.customerName,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        status: formData.status as ReservationStatus,
      },
    );

    if (result) {
      router.push("/reservations");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <Link href="/accueil" className="text-3xl font-bold text-orange-600">
            RestaurantApp
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Ajouter une réservation</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Restaurant */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Restaurant</label>
            <select
              name="restaurantId"
              value={formData.restaurantId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Sélectionner</option>
              {restaurants.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Nom */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Nom du client</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Heure */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Heure</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Nombre de personnes */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Nombre de personnes</label>
            <input
              type="number"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-bold"
            >
              {loading ? "Création..." : "Ajouter"}
            </button>

            <Link
              href="/reservations"
              className="flex-1 bg-gray-300 text-gray-900 px-6 py-3 rounded-lg text-center font-bold hover:bg-gray-400"
            >
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
 