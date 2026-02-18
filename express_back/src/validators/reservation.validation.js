import { reservationBaseSchema } from "./schemas.validation.js";
import { z } from "zod";
import mongoose from "mongoose";

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const reservationIdSchema = z.object({
  id: objectIdSchema, // restaurant _id
  reservationId: objectIdSchema, // reservation _id
});

export const createReservationSchema = reservationBaseSchema;

export const updateReservationSchema = reservationBaseSchema.partial();
