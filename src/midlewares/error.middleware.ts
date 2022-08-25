import { NextFunction, Response, Request } from "express";
import httpStatus from "http-status";
import config from "../config/config";
import { ApiError } from "../utils/error";

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

    const message: string = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  if (config.isProd && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.isDev && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

export { errorHandler, errorConverter };
