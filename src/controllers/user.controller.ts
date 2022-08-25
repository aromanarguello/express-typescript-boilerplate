import { NextFunction, Request, Response } from 'express';
import { CREATED } from 'http-status';
import userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const queryUsers = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['order', 'skip', 'limit']);
  const users = await userService.queryUsers(options);
  res.status(CREATED).json({
    data: users,
  });
});

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(CREATED).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default { queryUsers, createUser };
