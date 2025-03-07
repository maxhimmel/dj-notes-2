import { setListRouter } from "./routers/setLists";
import { trackRouter } from "./routers/tracks";
import { userRouter } from "./routers/user";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  user: userRouter,
  setLists: setListRouter,
  tracks: trackRouter,
});

export type AppRouter = typeof appRouter;
