import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import { Cache } from 'cache-manager';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import Redis from 'ioredis/built/Redis';

@Injectable()
export class RedisService extends ThrottlerStorageRedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
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

  async test() {
    // return await this.cacheManager.store.mset.
  }
  // async getRecord(key: string): Promise<number[]> {
  //   return await this.getRecord(key);
  // }

  // async addRecord(key: string, ttl: number): Promise<void> {
  //   await this.addRecord(key, ttl);
  // }
  storage: Record<string, number[]>;
}
