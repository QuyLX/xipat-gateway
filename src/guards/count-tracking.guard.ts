import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { TrackingPlan } from 'src/common/constants/plan';
import { ThrottlerException } from '@nestjs/throttler';

@Injectable()
export class CountTrackingGuard implements CanActivate {
  constructor(private redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { apikey, plan, id } = req.user;
    const { limit } = TrackingPlan[plan];
    const countTracking = await this.redisService.countTracking(apikey);
    const payload = this.caculateCountRequest(countTracking, limit);
    let currentTime = new Date();
    this.redisService.set(`${currentTime.getHours()}:monitorCount:${id}`, {
      ...payload,
      userId: id,
    });
    if (plan === 'unlimited') {
      return true;
    }
    if (countTracking > limit) {
      throw new ThrottlerException();
    }
    return true;
  }

  caculateCountRequest(currentCount: any, limit: number) {
    let countSuccess = 1;
    let countTotal = 0;
    countTotal = currentCount + 1;
    if (currentCount < limit) {
      countSuccess = countTotal;
      return {
        countSuccess,
      };
    } else {
      return {
        countSuccess,
        countTotal,
      };
    }
  }
}
