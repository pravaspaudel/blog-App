import express from "express";
import authRouter from "./routes/auth.route";
import loggerMiddleware from "./middlewares/logger.middleware";
import { ENV } from "./config/env.config";
import errorHandler from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(loggerMiddleware);

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
