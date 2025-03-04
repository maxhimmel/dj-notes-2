import mongoose from "mongoose";
import { z } from "zod";

export const EdgeValidation = z.object({
  edgeId: z.string(),
  source: z.string(),
  target: z.string(),
});

export type IEdge = z.infer<typeof EdgeValidation>;

export const EdgeSchema = new mongoose.Schema<IEdge>({
  edgeId: {
    required: true,
    unique: true,
    type: String,
  },
  source: {
    required: true,
    unique: true,
    type: String,
  },
  target: {
    required: true,
    unique: true,
    type: String,
  },
});
