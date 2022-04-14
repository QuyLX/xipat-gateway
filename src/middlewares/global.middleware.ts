import { INestApplication, Logger } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

export const loadGlobalMiddleWare = (app: INestApplication): void => {
  const logger = new Logger();
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('FRONT_END_APP'),
    credentials: true,
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
  app.setGlobalPrefix('api', {
    exclude: ['auth'],
  });
  app.enableVersioning({
    defaultVersion: ['1', '2'],
    type: VersioningType.URI,
  });
};
