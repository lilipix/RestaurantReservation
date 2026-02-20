import { reservationBaseSchema } from "./schemas.validation.js";
import { z } from "zod";
import { objectIdSchema } from "./objectId.validation.js";

export const reservationIdSchema = z.object({
  id: objectIdSchema, // restaurant _id
  reservationId: objectIdSchema, // reservation _id
});

export const createReservationSchema = reservationBaseSchema;

export const updateReservationSchema = reservationBaseSchema.partial();
