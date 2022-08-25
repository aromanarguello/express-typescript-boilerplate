import { FindManyOptions } from 'typeorm';
import { User } from '../entities/user.entity';

const queryUsers = async (options?: FindManyOptions) => {
  return await User.find(options);
};

export default { queryUsers };
