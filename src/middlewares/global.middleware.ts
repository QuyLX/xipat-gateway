import { INestApplication, Logger } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

export const loadGlobalMiddleWare = (app: INestApplication): void => {
  const logger = new Logger();
  const whitelist = ['example.com', 'api.example.com'];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.use(helmet());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(csurf());
  app.use(compression());
  app.useLogger(logger);
  app.enableVersioning({
    defaultVersion: ['1', '2'],
    type: VersioningType.URI,
  });
};
