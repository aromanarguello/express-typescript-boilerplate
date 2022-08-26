import { CONFLICT } from 'http-status';
import { sign, verify } from 'jsonwebtoken';
import config from '../config/config';
import { Token, TokenTypeEnum } from '../entities/token.entity';
import { UserRoleEnum } from '../entities/user.entity';
import { ApiError } from '../utils/error';
import { DataStoredInToken, TokenData } from './../interfaces/auth.interface';
import dayjs from 'dayjs';
import { Response } from 'express';

const savetoken = async (token: string, type: TokenTypeEnum, expires: Date, userId: string, isBlacklisted = false) => {
  return await Token.create({ token, userId, type, isBlacklisted, expiresOn: expires }).save();
};

const generateAuthTokens = async (userId: string, role: UserRoleEnum) => {
  const {
    jwt: { accessTokenExpiresIn, refreshTokenExpiresIn, accessTokenSecret, refreshTokenSecret },
  } = config;

  const dataStoredInToken: DataStoredInToken = { id: userId, role };
  const refreshTokenExpireDate = dayjs().add(Number(refreshTokenExpiresIn), 'day').toDate();
  const accessToken = sign(dataStoredInToken, accessTokenSecret, { expiresIn: `${accessTokenExpiresIn}m` });
  const refreshToken = sign(dataStoredInToken, refreshTokenSecret, { expiresIn: `${refreshTokenExpiresIn}d` });

  await savetoken(refreshToken, TokenTypeEnum.REFRESH, refreshTokenExpireDate, userId);

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

const sendCookie = (res: Response, refreshToken: string) => {
  const {
    cookie: { maxAge, httpOnly, secure },
  } = config;

  res.cookie('Authorization', refreshToken, { httpOnly, maxAge, secure, sameSite: 'none' });
};

const verifyToken = async (token: string, type: TokenTypeEnum) => {
  const payload = verify(token, config.jwt[type]);
  const existingToken = await Token.findOne({ where: { token, isBlacklisted: false } });

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
