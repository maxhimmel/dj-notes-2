import mongoose from "mongoose";
import { z } from "zod";

export const PositionValidation = z.object({
  x: z.coerce.number(),
  y: z.coerce.number(),
});

export type IPosition = z.infer<typeof PositionValidation>;

export const PositionSchema = new mongoose.Schema<IPosition>({
  x: Number,
  y: Number,
});
