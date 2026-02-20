"use client";

import { useState, FormEvent } from "react";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";

interface RestaurantFormProps {
  initialData?: Partial<Restaurant>;
  onSuccess?: (restaurant: Restaurant) => void;
  onClose?: () => void;
}

export default function RestaurantForm({ initialData = {}, onSuccess, onClose }: RestaurantFormProps) {
  const [name, setName] = useState(initialData.name || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let restaurant: Restaurant | null = null;

    if (initialData._id) {
      restaurant = await RestaurantService.updateRestaurant(initialData._id, { name, location, phone, email });
    } else {
      restaurant = await RestaurantService.createRestaurant({ name, location, phone, email });
    }

    setLoading(false);

    if (restaurant && onSuccess) {
      onSuccess(restaurant);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Localisation</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
      >
        {loading ? "En cours..." : initialData._id ? "Modifier" : "Ajouter"}
      </button>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Annuler
        </button>
      )}
    </form>
  );
}