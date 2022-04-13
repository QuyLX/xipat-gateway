import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

class CountReqStorage {
  apiKey: string;
  count: number;
}

@Injectable()
export class CountGuard implements CanActivate {
  constructor(private redisSerivce: RedisService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const req = context.switchToHttp().getRequest();
    const storeReqKey: any = await this.redisSerivce.get('apiKey');
    let count: number = 1;
    if (storeReqKey) {
      count = storeReqKey.count + 1;
    }
    this.redisSerivce.set('apiKey', {
      count: count,
    });
    console.log(count);

    const test = await this.redisSerivce.getAll();
    console.log(test);
    

    return true;
  }
}
