import { ExpressAuth, getSession as getAuthSession } from "@auth/express";
import Google from "@auth/express/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@dj-notes-2/shared";
import { Request } from "express";

const PROVIDERS = [Google];

export const authHandler = ExpressAuth({
  providers: PROVIDERS,
  adapter: PrismaAdapter(prisma),
});

export function getSession(req: Request) {
  return getAuthSession(req, { providers: PROVIDERS });
}
