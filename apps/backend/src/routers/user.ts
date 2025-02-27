import { z } from "zod";
import { createRouter, publicProcedure } from "../lib/trpc";

export const userRouter = createRouter({
  getUser: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return { id: input, name: "Bilbo" };
  }),
});
