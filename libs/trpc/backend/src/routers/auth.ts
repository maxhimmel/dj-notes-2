import {
  ExpressAuth,
  ExpressAuthConfig,
  getSession as getAuthSession,
} from "@auth/express";
import Google from "@auth/express/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@dj-notes-2/shared";
import { Request } from "express";

const CONFIG: ExpressAuthConfig = {
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session }) => session,
    redirect: ({ url, baseUrl }) => process.env["VITE_DOMAIN_URL"] as string,
  },
};

export const authHandler = ExpressAuth(CONFIG);

export function getSession(req: Request) {
  return getAuthSession(req, CONFIG);
}
