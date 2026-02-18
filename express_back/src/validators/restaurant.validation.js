import { z } from "zod";
import { reservationSchema } from "./reservation.validation.js";

export const createRestaurantSchema = z.object({
  name: z.string(),
  cuisine: z.string(),
  borough: z.string().optional(),
  capacity: z.number().int().positive(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }),
  menu:z.object({
    lastUpdate: z.string().datetime(),
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
