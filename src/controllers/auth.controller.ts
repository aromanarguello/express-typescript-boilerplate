import { NextFunction, Request, Response } from 'express';
import { CREATED } from 'http-status';
import config from '../config/config';
import authService from '../services/auth.service';
import userService from '../services/user.service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(CREATED).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const { user, accessToken, refreshToken } = await authService.login(userData);
    const {
      cookie: { maxAge, httpOnly, secure },
    } = config;

    res.cookie('Authorization', refreshToken, { httpOnly, maxAge, secure, sameSite: 'none' });
    res.status(CREATED).json({
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export default { signup, login };
