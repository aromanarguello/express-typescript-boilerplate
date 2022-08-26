import joi from 'joi';

require('dotenv').config();

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('development', 'production', 'test').required(),
    PORT: joi.number().default(4000),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    ACCESS_TOKEN_SECRET: joi.string().required(),
    REFRESH_TOKEN_SECRET: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const isProd = envVars.NODE_ENV === 'production';
const isDev = envVars.NODE_ENV === 'development';

export default {
  isProd,
  isDev,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  db: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    user: envVars.DB_USER,
    password: envVars.DB_PASSWORD,
    name: envVars.DB_NAME,
  },
  jwt: {
    accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: 30,
    refreshTokenExpiresIn: 3,
  },
  cookie: {
    maxAge: 72 * 60 * 60 * 1000,
    httpOnly: true,
    secure: !isDev,
    sameSite: 'none',
  },
};
