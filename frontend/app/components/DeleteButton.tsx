"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RestaurantService from "@/app/lib/restaurant.service";

interface Props {
  restaurantId: string;
}

export default function DeleteButton({ restaurantId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const success = await RestaurantService.deleteRestaurant(restaurantId);

    if (success) {
      router.push("/restaurants");
      router.refresh();
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <>
      {/* Bouton */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
      >
        Supprimer
      </button>

      {/* Modale */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 w-auto shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Confirmer la suppression
            </h2>

            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce restaurant ?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
