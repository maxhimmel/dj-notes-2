import mongoose from 'mongoose';
import { z } from 'zod';

export const SpotifyDataValidation = z.object({
  spotifyId: z.string(),
  albumImg: z.string(),
});

export type ISpotifyData = z.infer<typeof SpotifyDataValidation>;

export const SpotifyDataSchema = new mongoose.Schema<ISpotifyData>({
  spotifyId: String,
  albumImg: String,
});
