import { createApp } from './app';
import { appConfig } from '../infrastructure/config/app.config';
import { Logger } from '../shared/utils/logger';
import { Container } from '../infrastructure/di/container';

const startServer = () => {
  try {
    const app = createApp();

    const server = app.listen(appConfig.port, () => {
      Logger.info(`🚀 Server running on port ${appConfig.port}`);
      Logger.info(`📝 Environment: ${appConfig.nodeEnv}`);
      Logger.info(`🌐 CORS origin: ${appConfig.corsOrigin}`);
      
      Container.sessionCleanupService.start();
      
      Logger.info(`✅ Server is ready to accept requests`);
    });

    const gracefulShutdown = (signal: string) => {
      Logger.info(`${signal} signal received: closing HTTP server`);
      
      Container.sessionCleanupService.stop();
      
      server.close(() => {
        Logger.info('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    process.on('uncaughtException', (error) => {
      Logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      Logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
      process.exit(1);
    });

  } catch (error) {
    Logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
