import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { TrackingPlan } from 'src/common/constants/plan';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected storageService: RedisService;
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { apikey, plan } = req.user;
    const key = this.generateKey(context, apikey);
    const ttls = await this.storageService.getRecord(key);
    const { limit: newLimit, ttl: newTtl } = TrackingPlan[plan];

    const storeCount: any = await this.storageService.get(apikey);

    const payload = this.caculateCountRequest(storeCount, newLimit);

    await this.storageService.set(`countService_${apikey}`, payload);

    if (ttls.length >= newLimit) {
      throw new ThrottlerException();
    }

    await this.storageService.addRecord(key, newTtl);
    return true;
  }

  caculateCountRequest(storeCount: any, limit: number) {
    let countSuccess = 1;
    let countTotal = 1;
    if (storeCount) {
      countTotal = storeCount.countTotal + 1;
      countSuccess =
        storeCount.countSuccess < limit ? countTotal : storeCount.countSuccess;
    }
    return {
      countSuccess,
      countTotal,
    };
  }
}
