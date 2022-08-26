import { compare } from 'bcryptjs';
import { UNAUTHORIZED } from 'http-status';
import { User } from '../entities/user.entity';
import { ApiError } from '../utils/error';
import tokenService from './token.service';
import userService from './user.service';

const signup = async (userData: User) => {
  const user = await userService.createUser(userData);

  const { access, refresh } = await tokenService.generateAuthTokens(user.id, user.role);

  return { user, accessToken: access.token, refreshToken: refresh.token };
};

const login = async (userData: User) => {
  const user = await User.findOne({ where: { email: userData.email }, select: ['password', 'id', 'email', 'role'] });

  if (!user) {
    throw new ApiError(UNAUTHORIZED, 'Email not found');
  }

  const isValidPassword = await compare(userData.password, user.password);

  if (!isValidPassword) {
    throw new ApiError(UNAUTHORIZED, 'Invalid password');
  }

  const { access, refresh } = await tokenService.generateAuthTokens(user.id, user.role);

  return {
    accessToken: access.token,
    refreshToken: refresh.token,
    user,
  };
};

export default { login, signup };
