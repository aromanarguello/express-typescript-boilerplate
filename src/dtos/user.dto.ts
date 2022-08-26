import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
};

const refreshToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().min(8).required(),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    token: Joi.string().required(),
  }),
};

export default { createUser, loginUser, refreshToken, forgotPassword, resetPassword, verifyEmail };
