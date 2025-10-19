import type { ErrorRequestHandler, RequestHandler } from "express";

import AppError from "@/error";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ error: "Not Found" });
};
export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const { message, status = "error", statusCode = 500 } = err as AppError;
  if (process.env.NODE_ENV == "development" && statusCode == 500) {
    console.error("ERROR 💥", err);
  }
  const safeMessage = statusCode === 500 ? "Internal Server Error" : message;
  res.status(statusCode).json({
    message: safeMessage,
    status,
  });
};
