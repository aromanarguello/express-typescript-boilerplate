import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface DataStoredInToken {
  id: string;
}

export interface RequestwithUser extends Request {
  user: User;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
