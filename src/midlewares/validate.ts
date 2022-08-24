import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi, { Schema } from "joi";
import { ApiError } from "../utils/error";
import pick from "../utils/pick";

const validate =
  (schema: Schema) => (req: Request, _: Response, next: NextFunction) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    next();
  };

export default validate;
