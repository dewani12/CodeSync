import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./middlewares/passport.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import oAuthRouter from "./routes/oAuth.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/oAuth", oAuthRouter);

export default app;
