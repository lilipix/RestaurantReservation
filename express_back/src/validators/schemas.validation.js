import { z } from "zod";

/* =========================
ADDRESS
========================= */
export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  zipcode: z.string().min(1),
});

/* =========================
MENU
========================= */
export const menuItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  available: z.boolean().default(true),
});

export const categorySchema = z.object({
  name: z.string().min(1),
  items: z.array(menuItemSchema).min(1),
});

export const menuSchema = z.object({
  lastUpdate: z.coerce.date().optional(),
  categories: z.array(categorySchema).optional(),
});

/* =========================
RESERVATION
========================= */
export const reservationBaseSchema = z.object({
  customerName: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  guests: z.number().int().min(1),
  status: z.enum(["confirmed", "cancelled"]).default("confirmed"),
});
