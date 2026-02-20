"use client";

import { useState } from "react";
import ReservationService from "@/app/lib/reservation.service";

export default function ReservationForm({ restaurantId, reservation, onSuccess }) {
  const [customerName, setCustomerName] = useState(reservation?.customerName || "");
  const [date, setDate] = useState(reservation?.date || "");
  const [time, setTime] = useState(reservation?.time || "");
  const [guests, setGuests] = useState(reservation?.guests || 1);
  const [status, setStatus] = useState(reservation?.status || "confirmed");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (reservation?._id) {
        // update
        result = await ReservationService.updateReservation(restaurantId, reservation._id, {
          customerName,
          date,
          time,
          guests,
          status,
        });
      } else {
        // create
        result = await ReservationService.createReservation(restaurantId, {
          customerName,
          date,
          time,
          guests,
          status,
        });
      }

      if (result) {
        onSuccess(result);
      } else {
        setError("Erreur lors de l'enregistrement de la réservation.");
      }
    } catch (err) {
      setError(err.message || "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Nom du client</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4 flex gap-2">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">Heure</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Nombre de personnes</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          min={1}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">Statut</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="confirmed">Confirmé</option>
          <option value="pending">En attente</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 text-white font-bold py-2 rounded hover:bg-orange-700 disabled:opacity-50"
      >
        {reservation?._id ? "Mettre à jour" : "Créer la réservation"}
      </button>
    </form>
  );
}