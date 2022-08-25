import { UserRoleEnum } from '../entities/user.entity';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
