import { reservationBaseSchema } from "./schemas.validation.js";
import { z } from "zod";
import mongoose from "mongoose";

export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId format",
  });

export const reservationIdSchema = z.object({
  id: z.string(),
  reservationId: objectIdSchema,
});

export const createReservationSchema = reservationBaseSchema;

export const updateReservationSchema = reservationBaseSchema.partial();
