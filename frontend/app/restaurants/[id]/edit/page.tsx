"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import RestaurantService from "@/app/lib/restaurant.service";
import { Restaurant } from "@/app/types";

export default function EditRestaurantPage() {
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
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

  // Charger les données du restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await RestaurantService.getRestaurantById(restaurantId);
        if (data) {
          setRestaurant(data);
          setFormData({
            name: data.name,
            cuisine: data.cuisine,
            borough: data.borough,
            capacity: data.capacity.toString(),
            address: {
              street: data.address.street,
              city: data.address.city,
              zipcode: data.address.zipcode,
            },
          });
        } else {
          setError("Restaurant non trouvé");
        }
      } catch (err) {
        setError("Erreur lors du chargement du restaurant");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurant();
    }
  }, [restaurantId]);

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
        [name]: name === "capacity" ? value : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Validation
    if (!formData.name || !formData.cuisine || !formData.borough) {
      setError("Tous les champs obligatoires doivent être remplis");
      setSaving(false);
      return;
    }

    const capacityNum = parseInt(formData.capacity as string);
    if (isNaN(capacityNum) || capacityNum < 1) {
      setError("La capacité doit être un nombre positif");
      setSaving(false);
      return;
    }

    try {
      const result = await RestaurantService.updateRestaurant(restaurantId, {
        ...formData,
        capacity: capacityNum,
      } as any);

      if (result) {
        // Rediriger vers la page de détails
        router.refresh();
        router.push(`/restaurants/${restaurantId}`);
      } else {
        setError("Erreur lors de la mise à jour du restaurant");
      }
    } catch (err) {
      setError("Erreur lors de la mise à jour du restaurant");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-xl text-gray-600">Restaurant non trouvé</p>
          <Link
            href="/restaurants"
            className="text-orange-600 hover:underline mt-4 block"
          >
            Retour aux restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link
              href={`/restaurants/${restaurantId}`}
              className="text-orange-600 hover:underline"
            >
              ← Retour
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mt-4">
              Modifier: {restaurant.name}
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom du restaurant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du restaurant *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: La Bella Italia"
              />
            </div>

            {/* Cuisine */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de cuisine *
              </label>
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: Italienne"
              />
            </div>

            {/* Borough */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arrondissement/Quartier *
              </label>
              <input
                type="text"
                name="borough"
                value={formData.borough}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: Le Marais"
              />
            </div>

            {/* Capacité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacité *
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: 50"
              />
            </div>

            {/* Adresse */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Adresse
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rue *
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: 123 Rue de la Paix"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ex: Paris"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code postal *
                    </label>
                    <input
                      type="text"
                      name="address.zipcode"
                      value={formData.address.zipcode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ex: 75001"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400 transition"
              >
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
              <Link
                href={`/restaurants/${restaurantId}`}
                className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition text-center"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
