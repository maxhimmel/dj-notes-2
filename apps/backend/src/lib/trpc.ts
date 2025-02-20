import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "../api";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const createRouter = t.router;

export const apiMiddleware = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
});

export const publicProcedure = t.procedure;
