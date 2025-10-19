import meRouter from "@routes/me";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import morgan from "morgan";

import { NotFound } from "@/error";
import { errorHandler, notFoundHandler } from "@/middleware/errorHandler";

const app = express();

// Basic middlewares
app.use(express.json({ limit: "10kb" })); // limit body size
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV !== "test") app.use(morgan("combined"));

// Security headers (helmet)
app.use(helmet());

// Prevent NoSQL/SQL injection patterns
app.use(xss()); // basic XSS sanitization

// CORS config
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: process.env.CORS_ORIGIN ?? "https://your-site.com",
  }),
);

// Rate limiter
const limiter = rateLimit({
  legacyHeaders: false,
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  windowMs: 15 * 60 * 1000, // 15 minutes
});
app.use(limiter);

// Routes
app.use("/", (req, res) => {
  res.status(200).json("Hello world!");
});
app.use("/me", meRouter);

// Catch unhandled routes
app.all("/{*splat}", (req, res, next) => {
  next(new NotFound(`Can't find ${req.originalUrl} on this server!`));
});

// 404 + Error middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
