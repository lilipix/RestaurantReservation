"use client";

import { useState, FormEvent } from "react";
import ReservationService from "@/app/lib/reservation.service";
import { Reservation } from "@/app/types";

interface ReservationFormProps {
  restaurantId: string;
  initialData?: Partial<Reservation>;
  onSuccess?: (reservation: Reservation) => void;
  onClose?: () => void;
}

export default function ReservationForm({ restaurantId, initialData = {}, onSuccess, onClose }: ReservationFormProps) {
  const [customerName, setCustomerName] = useState(initialData.customerName || "");
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");
  const [guests, setGuests] = useState(initialData.guests || 1);
  const [status, setStatus] = useState(initialData.status || "pending");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let reservation: Reservation | null = null;

    if (initialData._id) {
      reservation = await ReservationService.updateReservation(
        restaurantId,
        initialData._id,
        { customerName, date, time, guests, status }
      );
    } else {
      reservation = await ReservationService.createReservation(restaurantId, {
        customerName,
        date,
        time,
        guests,
        status,
      });
    }

    setLoading(false);

    if (reservation && onSuccess) {
      onSuccess(reservation);
      if (onClose) onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom du client</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Heure</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre de personnes</label>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex gap-2">
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
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}