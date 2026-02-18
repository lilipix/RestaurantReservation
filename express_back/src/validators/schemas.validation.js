import { z } from "zod";

/* =========================
   ADDRESS
========================= */
const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  zipcode: z.string().min(1),
});

/* =========================
   MENU
========================= */
const menuItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  available: z.boolean(),
});

const categorySchema = z.object({
  name: z.string().min(1),
  items: z.array(menuItemSchema).min(1),
});

const menuSchema = z.object({
  lastUpdate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Date invalide" }),
  categories: z.array(categorySchema).min(1),
});

/* =========================
   RESERVATION
========================= */
const reservationBaseSchema = z.object({
  customerName: z.string().min(1),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Date invalide" }),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  guests: z.number().int().positive(),
  status: z.enum(["confirmed", "cancelled", "pending"]),
});
