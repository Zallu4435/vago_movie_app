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
import { SessionConfig } from '../shared/constants/sessionConfig';
import { ResponseStatus } from '../shared/constants/responseStatus';
import { ApiRoutes } from '../shared/constants/routes';

export const createApp = (): Express => {
  const app = express();

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
      maxAge: SessionConfig.TTL_MS, 
      httpOnly: true,
      secure: isProduction, 
      sameSite: isProduction ? 'none' : 'lax', 
    },
  }));

  app.use(ApiRoutes.BASE, circuitBreaker.middleware());

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

  app.use(ApiRoutes.BASE, routes);

  app.get('/', (req, res) => {
    res.json({
      status: ResponseStatus.SUCCESS,
      message: 'Movie Search & Favorites API',
      version: '1.0.0',
      endpoints: {
        health: `${ApiRoutes.BASE}${ApiRoutes.HEALTH}`,
        movies: `${ApiRoutes.BASE}${ApiRoutes.MOVIES}`,
        favorites: `${ApiRoutes.BASE}${ApiRoutes.FAVORITES}`,
      },
    });
  });

  app.use(notFoundHandler);

  app.use(errorHandler);

  return app;
};
