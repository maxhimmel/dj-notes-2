import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { getSession } from "../routers/auth";

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const session = await getSession(req);

  return {
    req,
    res,
    session,
  };
}
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const createRouter = t.router;

export const publicProcedure = t.procedure;
