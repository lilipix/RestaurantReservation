"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReservationService from "../lib/reservation.service";

interface Props {
  restaurantId: string;
  reservationId: string;
}

export default function DeleteReservationButton({
  restaurantId,
  reservationId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    const success = await ReservationService.deleteReservation(
      restaurantId,
      reservationId,
    );

    if (success) {
      setIsOpen(false);
      router.refresh(); // recharge la page
    } else {
      alert("Erreur lors de la suppression");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
      >
        Supprimer
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Supprimer la réservation ?
            </h2>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
                disabled={loading}
              >
                Annuler
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
