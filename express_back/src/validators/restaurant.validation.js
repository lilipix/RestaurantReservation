import { z } from "zod";
import {
  addressSchema,
  menuSchema,
  reservationBaseSchema,
} from "./schemas.validation.js";
import { objectIdSchema } from "./objectId.validation.js";

export const restaurantIdSchema = z.object({
  id: objectIdSchema,
});

export const createRestaurantSchema = z.object({
  name: z.string().min(1),
  cuisine: z.string().min(1),
  borough: z.string().min(1),
  capacity: z.number().int().min(1),
  address: addressSchema,
  menu: menuSchema,
  reservations: z.array(reservationBaseSchema).optional(),
});

export const updateRestaurantSchema = z.object({
  name: z.string().min(1).optional(),
  cuisine: z.string().min(1).optional(),
  borough: z.string().min(1).optional(),
  capacity: z.number().int().min(1).optional(),
  address: addressSchema.partial().optional(),
  menu: menuSchema.partial().optional(),
});
