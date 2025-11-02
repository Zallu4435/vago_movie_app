import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { createRoutes } from '../interface-adapters/http/routes';
import { errorHandler } from '../interface-adapters/http/middleware/errorHandler';
import { notFoundHandler } from '../interface-adapters/http/middleware/notFoundHandler';
import { circuitBreaker } from '../interface-adapters/http/middleware/circuitBreaker';
import { Container } from '../infrastructure/di/container';
import { appConfig } from '../infrastructure/config/app.config';
import { Logger } from '../shared/utils/logger';

export const createApp = (): Express => {
  const app = express();

  // Trust first proxy (required for Render and other hosting platforms)
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: appConfig.corsOrigin,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const isProduction = appConfig.nodeEnv === 'production';

  app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      secure: isProduction, // Use secure cookies in production (HTTPS)
      sameSite: isProduction ? 'none' : 'lax', // Required for cross-origin in production
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
