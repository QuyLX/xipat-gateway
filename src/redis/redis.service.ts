import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: object) {
    return await this.cacheManager.set(key, value);
  }

  async del(key: any) {
    return await this.cacheManager.del(key);
  }
}
