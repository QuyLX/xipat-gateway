import {
  Module,
  CACHE_MANAGER,
  CacheModule,
  Inject,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { RedisService } from './redis.service';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          ttl: 60 * 3600 * 1000,
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [CacheModule, RedisService],
})
export class RedisModule {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  onModuleInit(): any {
    const logger = new Logger('Cache');
  }
}
