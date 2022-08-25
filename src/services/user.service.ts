import { hash } from 'bcryptjs';
import { CONFLICT } from 'http-status';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import { ApiError } from '../utils/error';

const queryUsers = async (options?: FindManyOptions) => {
  return await User.find(options);
};

const getUser = async (id: string, options?: FindOneOptions) => {
  return await User.findOne({ where: { id }, ...options });
};

const createUser = async (user: User) => {
  const findUser = await User.findOne({ where: { email: user.email } });

  if (findUser) {
    throw new ApiError(CONFLICT, 'Email already in use');
  }

  const hashedPassword = await hash(user.password, 10);

  return await User.create({ ...user, password: hashedPassword }).save();
};

export default { queryUsers, getUser, createUser };
