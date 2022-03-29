import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
  CacheModule,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './configs';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { CourierModule } from './modules/courier/courier.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';
import { ServerModule } from './modules/server/server.module';
import { UserModule } from './modules/user/user.module';
import { TrackingModule } from './modules/tracking/tracking.module';
import { CourierNotFoundModule } from './modules/courier-not-found/courier-not-found.module';
import { AlertModule } from './modules/alert/alert.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from './common/redis/redis.module';
import { LicenseModule } from './modules/license/license.module';
import { MailModule } from './modules/mail/mail.module';

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
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
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
    AlertModule,
    TasksModule,
    RedisModule,
    LicenseModule,
    MailModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
