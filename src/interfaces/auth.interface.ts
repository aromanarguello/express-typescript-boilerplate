import { Request } from 'express';

import { User } from '../entities/user.entity';

export interface DataStoredInToken {
  id: string;
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
