import { BaseEntity as Base, CreateDateColumn, UpdateDateColumn } from 'typeorm';

class BaseEntity extends Base {
  @CreateDateColumn({ type: 'timestamp', name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_on' })
  updatedOn: Date;
}

export default BaseEntity;
