import {
  ThrottlerException,
  ThrottlerGuard,
} from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected storageService: RedisService;
  protected getTracker(req: Record<string, any>): string {
    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }

  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = this.generateKey(context, req.ip);
    const ttls = await this.storageService.getRecord(key);
    console.log(ttls);

    if (ttls.length >= limit) {
      throw new ThrottlerException();
    }

    await this.storageService.addRecord(key, ttl);
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return this.handleRequest(context, 5, 10);
  }
}
