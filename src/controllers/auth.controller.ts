import { NextFunction, Request, Response } from 'express';
import { CREATED } from 'http-status';
import userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';

const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(CREATED).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default { signup };
