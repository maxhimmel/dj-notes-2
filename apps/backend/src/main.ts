import express from "express";
import morgan from "morgan";
import path from "path";
import appRouter from "./api";
import expressAuth from "./routers/auth";

const app = express();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/auth/*", expressAuth);
app.use("/api", appRouter);

// Handle all other routes by serving the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
app.on("error", console.error);
