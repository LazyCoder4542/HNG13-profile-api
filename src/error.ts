export default class AppError extends Error {
  isOperational: boolean;
  status: string;
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthError extends AppError {
  constructor(msg: string) {
    super(msg, 401);
  }
}

export class BadRequest extends AppError {
  constructor(msg: string) {
    super(msg, 400);
  }
}

export class Forbidden extends AppError {
  constructor(msg: string) {
    super(msg, 403);
  }
}

export class NotFound extends AppError {
  constructor(msg: string) {
    super(msg, 404);
  }
}

export class NotImplemented extends AppError {
  constructor(msg: string) {
    super(msg, 501);
  }
}

export class PayWall extends AppError {
  constructor(msg: string) {
    super(msg, 402);
  }
}
