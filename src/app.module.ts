import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './configs';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { CourierModule } from './components/courier/courier.module';
import { DictionaryModule } from './components/dictionary/dictionary.module';
import { ServerModule } from './components/server/server.module';
import { UserModule } from './components/user/user.module';
import { TrackingModule } from './components/tracking/tracking.module';
import { CourierNotFoundModule } from './components/courier-not-found/courier-not-found.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from './redis/redis.module';
import { LicenseModule } from './components/license/license.module';
import { MailModule } from './mail/mail.module';
import { AllExceptionsFilter } from './exceptions/base-exceoption.filter';
import { LogModule } from './log/log.module';
import { HealthModule } from './health/health.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import DatabaseLogger from './common/databaseLogger';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'production';
        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          logging: true,
          logger: new DatabaseLogger(),
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    AuthorModule,
    CourierModule,
    DictionaryModule,
    ServerModule,
    TrackingModule,
    CourierNotFoundModule,
    UserModule,
    RedisModule,
    LicenseModule,
    MailModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'user',
            module: UserModule,
          },
        ],
      },
    ]),
    LogModule,
    HealthModule,
    UploadFileModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
