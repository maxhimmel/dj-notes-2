import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const spotifyApi = SpotifyApi.withClientCredentials(
  process.env["SPOTIFY_CLIENT_ID"] as string,
  process.env["SPOTIFY_CLIENT_SECRET"] as string
);

export const trackRouter = createRouter({
  search: protectedProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input.query) {
        return { tracks: [] };
      }

      const results = await spotifyApi.search(input.query, ["track"]);
      return { tracks: results.tracks.items };
    }),
});
