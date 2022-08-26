import { CONFLICT } from 'http-status';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/config';
import { Token, TokenTypeEnum } from '../entities/token.entity';
import { ApiError } from '../utils/error';
import { DataStoredInToken } from './../interfaces/auth.interface';
import dayjs from 'dayjs';
import { Response } from 'express';

const savetoken = async (token: string, type: TokenTypeEnum, expires: Date, userId: string, isBlacklisted = false) => {
  return await Token.create({ token, userId, type, isBlacklisted, expiresOn: expires }).save();
};

const generateAuthTokens = async (userId: string) => {
  const {
    jwt: { accessTokenExpiresIn, refreshTokenExpiresIn, accessTokenSecret, refreshTokenSecret },
  } = config;

  const dataStoredInToken: DataStoredInToken = { id: userId };
  const accessTokenExpireDate = dayjs().add(Number(accessTokenExpiresIn), 'day').toDate();
  const accessToken = sign(dataStoredInToken, accessTokenSecret, { expiresIn: `${accessTokenExpiresIn}d` });
  const refreshToken = sign(dataStoredInToken, refreshTokenSecret, { expiresIn: `${refreshTokenExpiresIn}d` });

  await savetoken(accessToken, TokenTypeEnum.ACCESS, accessTokenExpireDate, userId);

  return {
    access: {
      token: accessToken,
      expiresIn: accessTokenExpiresIn,
    },
    refresh: {
      token: refreshToken,
      expiresIn: refreshTokenExpiresIn,
    },
  };
};

const sendCookie = (res: Response, token: string) => {
  const {
    cookie: { maxAge, httpOnly, secure },
  } = config;

  res.cookie('Authorization', token, { httpOnly, maxAge, secure, sameSite: 'none' });
};

const verifyToken = async (token: string, type: TokenTypeEnum) => {
  const secret = type === TokenTypeEnum.REFRESH ? 'refreshTokenSecret' : 'accessTokenSecret';
  const payload = verify(token, config.jwt[secret]);

  const existingToken = await Token.findOne({ where: { token, isBlacklisted: false, userId: payload['id'] } });

  if (!existingToken) {
    throw new ApiError(CONFLICT, 'Token not found');
  }

  return existingToken;
};

export default {
  generateAuthTokens,
  sendCookie,
  verifyToken,
};
