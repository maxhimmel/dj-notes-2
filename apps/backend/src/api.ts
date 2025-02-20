import * as trpcExpress from "@trpc/server/adapters/express";
import { createRouter } from "./lib/trpc";
import { userRouter } from "./routers/user";
import { createContext } from "./lib/trpc";

const appRouter = createRouter({
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export default trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
