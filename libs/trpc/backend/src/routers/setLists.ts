import { z } from "zod";
import { createRouter, protectedProcedure } from "../trpc";

export const setListRouter = createRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const newSetList = await ctx.db.setList.create({
        data: {
          name: input.name,
          userId: user.id as string,
        },
      });

      return { setList: newSetList };
    }),

  getSets: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const setLists = await ctx.db.setList.findMany({
      where: { userId: user.id },
    });

    return { setLists };
  }),

  getSetList: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return { id: input, name: "Bilbo" };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const deletedSetList = await ctx.db.setList.delete({
        where: { id: input.id, userId: user.id },
      });

      return { setList: deletedSetList };
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return { id: input, name: "Bilbo" };
    }),
});
