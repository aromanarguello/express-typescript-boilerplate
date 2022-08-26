import { NextFunction, Response } from 'express';
import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import { verify } from 'jsonwebtoken';

import config from '../config/config';
import userService from '../services/user.service';
import { ApiError } from '../utils/error';
import { DataStoredInToken, RequestWithUser } from './../interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization =
      req.cookies['Authorization'] ||
      (req.headers['Authorization'] ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const verificationResponse = verify(Authorization, config.jwt.accessTokenSecret) as DataStoredInToken;
      const userId = verificationResponse.id;

      const user = await userService.getUser(userId);

      if (user) {
        req.user = user;
        next();
      } else {
        next(new ApiError(UNAUTHORIZED, 'Invalid credentials'));
      }
    } else {
      next(new ApiError(NOT_FOUND, 'No credentials provided'));
    }
  } catch (error) {
    next(new ApiError(UNAUTHORIZED, 'Invalid credentials'));
  }
};

export default authMiddleware;
