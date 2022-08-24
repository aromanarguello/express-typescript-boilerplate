import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../utils/baseEntity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;
}
