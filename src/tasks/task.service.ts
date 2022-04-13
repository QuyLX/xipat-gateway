import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression } from '@nestjs/schedule';
import { HealthService } from 'src/health/health.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TaskService {
  constructor(
    private healthService: HealthService,
    private redisService: RedisService,
  ) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const countTest = await this.redisService.get('apiKey');
    console.log(Date.now());
    this.logger.debug('Called when the second is 5');
    this.logger.log(countTest);
  }

  // @Interval(5000)
  async handleInterval() {
    // const countTest = await this.redisService.getAll();
    // console.log(countTest);
    // this.logger.debug('Called when the second is 5');
    // this.logger.log(countTest);
    // this.logger.debug('Called every 10 seconds');
  }
}
