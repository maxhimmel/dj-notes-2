import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";

export default ExpressAuth({ providers: [Google] });
