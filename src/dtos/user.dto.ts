import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
  }),
};

export default { createUser };
