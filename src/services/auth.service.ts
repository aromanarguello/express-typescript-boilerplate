import { compare } from 'bcryptjs';
import { UNAUTHORIZED } from 'http-status';
import { User } from '../entities/user.entity';
import { ApiError } from '../utils/error';
import tokenService from './token.service';

const login = async (userData: User) => {
  const user = await User.findOne({ where: { email: userData.email } });

  if (!user) {
    throw new ApiError(UNAUTHORIZED, 'Email not found');
  }

  const isValidPassword = await compare(userData.password, user.password);

  if (!isValidPassword) {
    throw new ApiError(UNAUTHORIZED, 'Invalid password');
  }

  const tokenData = tokenService.createToken(user.id);
  const cookie = tokenService.createCookie(tokenData);

  return {
    cookie,
    user,
  };
};

export default { login };
