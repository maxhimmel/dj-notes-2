import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter, authHandler, createContext } from "@trpc/backend";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  })
);
app.use(express.static(path.join(__dirname, "../frontend")));

app.set("trust proxy", true);
app.use("/api/auth/*", authHandler);
app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Handle all other routes by serving the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
app.on("error", console.error);
