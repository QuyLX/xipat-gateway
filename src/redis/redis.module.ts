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

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6379,
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
