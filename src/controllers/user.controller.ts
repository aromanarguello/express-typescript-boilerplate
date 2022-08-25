import { Response, Request } from 'express';
import httpStatus from 'http-status';
import userService from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const queryUsers = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['order', 'skip', 'limit']);
  const users = await userService.queryUsers(options);
  res.status(httpStatus.CREATED).json({
    data: users,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json({
    data: user,
  });
});

export default { queryUsers, createUser };
