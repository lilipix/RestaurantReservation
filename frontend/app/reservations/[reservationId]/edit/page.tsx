"use client";
import type { ReservationStatus } from "@/app/types";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReservationService from "@/app/lib/reservation.service";
import Link from "next/link";

export default function EditReservationPage({
  params,
}: {
  params: { reservationId: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservationId = params.reservationId;
  const restaurantId = searchParams.get("restaurantId") || "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);

  const [status, setStatus] = useState<ReservationStatus>("confirmed");

  useEffect(() => {
    async function fetchReservation() {
      setLoading(true);
      setError("");
      const res = await ReservationService.getReservationById(
        restaurantId,
        reservationId,
      );
      if (!res) {
        setError("Réservation non trouvée");
      } else {
        setCustomerName(res.customerName || "");
        setDate(res.date || "");
        setTime(res.time || "");
        setGuests(res.guests || 1);
        setStatus(res.status || "confirmed");
      }
      setLoading(false);
    }
    fetchReservation();
  }, [reservationId, restaurantId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const updated = await ReservationService.updateReservation(
      restaurantId,
      reservationId,
      {
        customerName,
        date,
        time,
        guests,
        status,
      },
    );
    if (updated) {
      setSuccess("Réservation modifiée avec succès");
      router.refresh();
      setTimeout(() => router.push("/reservations"), 1200);
    } else {
      setError("Erreur lors de la modification");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Chargement...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-center mt-20">
        <h1 className="text-2xl text-red-600">{error}</h1>
        <Link
          href="/reservations"
          className="text-orange-600 hover:underline mt-4 block"
        >
          Retour aux réservations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/reservations"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Retour
          </Link>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Modifier la réservation
          </h1>
          {success && <div className="mb-4 text-green-600">{success}</div>}
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700  mb-2"
              >
                Nom du client
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Heure
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nombre de personnes
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                min={1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Statut
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={status}
                onChange={(e) => setStatus(e.target.value as ReservationStatus)}
              >
                <option value="confirmed">Confirmée</option>
                <option value="cancelled">Annulée</option>
              </select>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg text-center hover:bg-orange-700 font-semibold"
              >
                Enregistrer
              </button>
              <Link
                href="/reservations"
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-center hover:bg-gray-300 font-semibold"
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
