import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { getSession } from "./routers/auth";
import { prisma } from "@dj-notes-2/shared";
import superjson from "superjson";

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const session = await getSession(req);

  return {
    req,
    res,
    session,
    db: prisma,
  };
}
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      cause: "User is not logged in",
    });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
