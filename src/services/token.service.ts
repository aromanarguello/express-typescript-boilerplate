import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { DataStoredInToken, TokenData } from './../interfaces/auth.interface';

const createToken = (userId: string): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: userId };
  const secretKey = config.jwt.secret;
  const expiresIn = config.jwt.expiresIn;

  return {
    expiresIn,
    token: sign(dataStoredInToken, secretKey, { expiresIn }),
  };
};

const createCookie = (tokenData: TokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
};

export default {
  createToken,
  createCookie,
};
