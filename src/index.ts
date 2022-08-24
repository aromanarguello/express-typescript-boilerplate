import { Server } from 'http';
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

// const exitHandler = () => {
//   if (server) {
//     server.close(() => {
//       logger.info('Server closed');
//       process.exit(1);
//     });
//   }
// };

// const unexpectedErrorHandler = (error: Error) => {
//   logger.error(error);
//   exitHandler();
// };

// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received');
//   if (server) {
//     server.close();
//   }
// });
