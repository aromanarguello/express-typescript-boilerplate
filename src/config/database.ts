import { DataSource } from 'typeorm';
import config from './config';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: config.isDev,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/*.ts'],
});

export default dataSource;
