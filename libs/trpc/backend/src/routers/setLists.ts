import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";

export const setListRouter = createRouter({
  create: protectedProcedure.mutation(({ ctx, input }) => {
    return { id: input, name: "Bilbo" };
  }),

  getSets: protectedProcedure.query(({ ctx, input }) => {
    return { id: input, name: "Bilbo" };
  }),

  getSetList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return { id: input, name: "Bilbo" };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return { id: input, name: "Bilbo" };
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return { id: input, name: "Bilbo" };
    }),
});
