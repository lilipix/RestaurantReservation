export const createReservationSchema = z.object({
  customerName: z.string(),
  numberOfGuests: z.number().int().positive(),
  date: z.string().datetime(),
});

export const updateReservationSchema = z.object({
  customerName: z.string().optional(),
  numberOfGuests: z.number().int().positive().optional(),
  date: z.string().datetime().optional(),
});

export const reservationIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID invalide"),
});
