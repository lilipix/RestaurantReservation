import { z } from "zod";
import { reservationSchema } from "./reservation.validation.js";

export const createRestaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  reservations: z.array(reservationSchema).optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  reservations: z.array(reservationSchema).optional(),
});

export const restaurantIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID invalide"),
});
