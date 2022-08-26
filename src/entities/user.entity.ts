import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../utils/baseEntity';
import { Token } from './token.entity';

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @OneToMany(() => Token, (token) => token.user, { cascade: true })
  tokens: Token[];

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;
}
