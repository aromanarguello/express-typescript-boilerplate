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

export default { queryUsers };
