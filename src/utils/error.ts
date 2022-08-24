export class ApiError extends Error {
  message: string;
  statusCode: number;
  isOperational?: boolean;
  stack?: string;

  constructor(
    statusCode: number,
    message: string,
    isOperational = false,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
