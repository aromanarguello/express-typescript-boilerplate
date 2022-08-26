import app from './app';
import config from './config/config';
import dataSource from './config/database';
import logger from './config/logger';

dataSource.initialize().then(() => {
  logger.info('Database connected');
  app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`);
  });
});
