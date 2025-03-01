import { userRouter } from "./routers/user";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
