import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../utils/baseEntity';
import { User } from './user.entity';

export enum TokenTypeEnum {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user, { cascade: true })
  user: User;

  @Column({ name: 'expires_on' })
  expiresOn: Date;

  @Column({ name: 'token_type', type: 'enum', enum: TokenTypeEnum })
  type: TokenTypeEnum;

  @Column({ default: false })
  isBlacklisted: boolean;
}
