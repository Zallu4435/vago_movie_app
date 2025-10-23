import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { createRoutes } from '../infrastructure/adapters/http/routes';
import { errorHandler } from '../infrastructure/adapters/http/middleware/errorHandler';
import { notFoundHandler } from '../infrastructure/adapters/http/middleware/notFoundHandler';
import { circuitBreaker } from '../infrastructure/adapters/http/middleware/circuitBreaker';
import { Container } from '../infrastructure/di/container';
import { appConfig } from '../infrastructure/config/app.config';
import { Logger } from '../shared/utils/logger';

export const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: appConfig.corsOrigin,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true
    },
  }));

  app.use('/api', circuitBreaker.middleware());

  if (appConfig.nodeEnv === 'development') {
    app.use((req, res, next) => {
      Logger.info(`${req.method} ${req.path}`);
      next();
    });
  }

  const routes = createRoutes(
    Container.movieController,
    Container.favoriteController
  );

  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Movie Search & Favorites API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        movies: '/api/movies',
        favorites: '/api/favorites',
      },
    });
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};
