import joi from "joi";

require("dotenv").config();

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test")
      .required(),
    PORT: joi.number().default(4000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const isProd = envVars.NODE_ENV === "production";
const isDev = envVars.NODE_ENV === "development";

export default {
  isProd,
  isDev,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};
