import { Request } from 'express';
import { User, UserRoleEnum } from '../entities/user.entity';

export interface DataStoredInToken {
  id: string;
  role: UserRoleEnum;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface Tokens {
  token: string;
  expiresIn: string;
}

export interface TokenData {
  access: Tokens;
  refresh: Tokens;
}
