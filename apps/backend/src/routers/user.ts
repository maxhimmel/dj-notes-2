import { createRouter, publicProcedure } from "../lib/trpc";
import { z } from "zod";

export const userRouter = createRouter({
  getUser: publicProcedure.input(z.string()).query((opts) => {
    return { id: opts.input, name: "Bilbo" };
  }),
});
