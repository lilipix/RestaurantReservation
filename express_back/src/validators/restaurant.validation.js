import { z } from "zod";
import {
  addressSchema,
  menuSchema,
  reservationBaseSchema,
} from "./schemas.validation.js";

export const restaurantIdSchema = z
  .string()
  .regex(/^resto_\d+$/, { message: "Invalid restaurant id format" });

export const createRestaurantSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  cuisine: z.string().min(1),
  borough: z.string().min(1),
  capacity: z.number().int().min(1),
  address: addressSchema,
  menu: menuSchema,
  reservations: z.array(reservationBaseSchema).default([]),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();
