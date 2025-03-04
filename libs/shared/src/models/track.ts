import mongoose from "mongoose";
import { z } from "zod";
import { PositionSchema, PositionValidation } from "./position";
import { SpotifyDataSchema, SpotifyDataValidation } from "./spotifyData";

export const TrackValidation = z.object({
  nodeId: z.string(),
  position: PositionValidation,

  title: z.string().optional(),
  artist: z.string().optional(),
  spotifyData: SpotifyDataValidation.optional(),
});

export type ITrack = z.infer<typeof TrackValidation>;

export const TrackSchema = new mongoose.Schema<ITrack>({
  nodeId: {
    required: true,
    unique: true,
    type: String,
  },
  position: {
    required: true,
    type: PositionSchema,
  },

  title: String,
  artist: String,
  spotifyData: SpotifyDataSchema,
});
