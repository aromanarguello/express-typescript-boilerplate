import { NextFunction, Request, Response } from 'express';
import { CREATED } from 'http-status';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';

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
    const { cookie, user } = await authService.login(userData);

    res.setHeader('Set-Cookie', [cookie]);
    res.status(CREATED).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default { signup, login };
