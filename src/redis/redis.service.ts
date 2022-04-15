import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache, Store } from 'cache-manager';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { RedisClient } from 'redis';

interface CustomRedisStore extends Store {
  store: {
    getClient: () => RedisClient;
  };
}
@Injectable()
export class RedisService extends ThrottlerStorageRedisService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(CACHE_MANAGER) private redisClient: CustomRedisStore,
  ) {
    super();
  }

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: object) {
    return await this.cacheManager.set(key, value);
  }

  async del(key: any) {
    return await this.cacheManager.del(key);
  }

  async getAll() {
    return await this.cacheManager.store.keys();
  }

  async countTracking(key: string): Promise<unknown> {
    const redisClient = this.redisClient.store.getClient();
    const countKey = `countService_${key}`;
    const existKey = await this.get(countKey);

    if (existKey === 1) {
      let endOfTheDay = new Date();
      endOfTheDay.setUTCHours(23, 59, 59, 999);
      let currentWhileReqTrigger = Date.now();

      const ttl = Math.round(
        (endOfTheDay.getTime() - currentWhileReqTrigger) / 1000,
      );
      redisClient.expire(countKey, ttl);
    }

    redisClient.incr(countKey);
    return existKey;
  }

  storage: Record<string, number[]>;
}
