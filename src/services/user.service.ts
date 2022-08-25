import { FindManyOptions, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';

const queryUsers = async (options?: FindManyOptions) => {
  return await User.find(options);
};

const getUser = async (id: string, options?: FindOneOptions) => {
  return await User.findOne({ where: { id }, ...options });
};

export default { queryUsers, getUser };
