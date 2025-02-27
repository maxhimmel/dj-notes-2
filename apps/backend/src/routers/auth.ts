import { ExpressAuth, getSession as getAuthSession } from "@auth/express";
import Google from "@auth/express/providers/google";
import { Request } from "express";

const PROVIDERS = [Google];

export const authHandler = ExpressAuth({ providers: PROVIDERS });

export function getSession(req: Request) {
  return getAuthSession(req, { providers: PROVIDERS });
}
