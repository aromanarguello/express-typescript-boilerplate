import { NextFunction, Request, Response } from 'express';
import { CREATED } from 'http-status';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken } = await authService.signup(req.body);

    tokenService.sendCookie(res, accessToken);

    res.status(CREATED).json({
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const { user, accessToken } = await authService.login(userData);

    tokenService.sendCookie(res, accessToken);

    res.status(CREATED).json({
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const refreshAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('Authorization');
    const { refreshToken, accessToken } = await authService.refreshAuth(req.cookies['Authorization']);

    tokenService.sendCookie(res, refreshToken);

    res.status(CREATED).json({ data: { accessToken } });
  } catch (error) {
    next(error);
  }
};

export default { signup, login, refreshAuth };
