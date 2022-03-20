import { NestFactory } from '@nestjs/core';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggingService } from './common/helpers/logging/logging.service';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const logger = new LoggingService();
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
  app.use(csurf());
  app.use(compression());
  app.useLogger(logger);
  app.enableVersioning({
    defaultVersion: VERSION_NEUTRAL,
    type: VersioningType.URI,
  });
  await app.listen(port);
  logger.log(`Application start in ${port}`, 'Global app');
}
bootstrap();
