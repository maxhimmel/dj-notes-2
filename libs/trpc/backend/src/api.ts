import { setListRouter } from "./routers/setLists";
import { userRouter } from "./routers/user";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  user: userRouter,
  setLists: setListRouter,
});

export type AppRouter = typeof appRouter;
