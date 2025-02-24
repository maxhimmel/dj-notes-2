import * as trpcExpress from "@trpc/server/adapters/express";
import { createRouter, createContext } from "./lib/trpc";
import { userRouter } from "./routers/user";

const appRouter = createRouter({
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export default trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});
