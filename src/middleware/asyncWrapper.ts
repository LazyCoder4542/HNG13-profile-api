import { RequestHandler } from "express";

const asyncWrap: (fn: RequestHandler) => RequestHandler =
  (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncWrap;
