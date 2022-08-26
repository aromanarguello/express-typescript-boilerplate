import { NextFunction, Request, Response } from 'express';
import { CREATED } from 'http-status';
import config from '../config/config';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import userService from '../services/user.service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await authService.signup(req.body);

    tokenService.sendCookie(res, refreshToken);

    res.status(CREATED).json({
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const { user, accessToken, refreshToken } = await authService.login(userData);

    tokenService.sendCookie(res, refreshToken);

    res.status(CREATED).json({
      data: { user, accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export default { signup, login };
