import mongoose from "mongoose";
import { z } from "zod";
import { EdgeSchema, EdgeValidation } from "./edge";
import { TrackSchema, TrackValidation } from "./track";

export const SetListValidation = z.object({
  name: z.string(),
  tracks: z.array(TrackValidation),
  edges: z.array(EdgeValidation),
});

export type ISetList = z.infer<typeof SetListValidation>;

export const SetListSchema = new mongoose.Schema<ISetList>(
  {
    name: {
      required: true,
      unique: true,
      type: String,
    },
    tracks: [TrackSchema],
    edges: [EdgeSchema],
  },
  {
    timestamps: true,
  }
);
