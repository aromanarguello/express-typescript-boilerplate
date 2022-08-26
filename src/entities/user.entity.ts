import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../utils/baseEntity';

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

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;
}
