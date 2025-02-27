import { ExpressAuth, getSession } from "@auth/express";
import Google from "@auth/express/providers/google";
import { NextFunction, Request, Response } from "express";

const PROVIDERS = [Google];

export const authHandler = ExpressAuth({ providers: PROVIDERS });

export async function authSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.session = await getSession(req, { providers: PROVIDERS });
  next();
}
