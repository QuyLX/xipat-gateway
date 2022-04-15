import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression } from '@nestjs/schedule';
import { HealthService } from 'src/health/health.service';
import { RedisService } from 'src/redis/redis.service';
import { MonitorService } from 'src/features/monitor/monitor.service';

@Injectable()
export class TaskService {
  constructor(
    private healthService: HealthService,
    private redisService: RedisService,
    private monitorService: MonitorService,
  ) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    // const countTest = await this.redisService.get('apiKey');
    console.log(Date.now());
    this.logger.debug('Called when the second is 5');
    // this.logger.log(countTest);
  }

  @Interval(15000)
  async handleInterval() {
    const currentTime = new Date();
    const countTest: string[] = await this.redisService.getAll();

    const monitorTypeSelect = `${currentTime.getHours()}:monitorCount:`;

    const monitor = countTest.filter((item) =>
      item.includes(monitorTypeSelect),
    );

    for (let index = 0; index < monitor.length; index++) {
      const element = monitor[index];
      const userId = element.slice(element.lastIndexOf(':') + 1);
      const payloadMonitor: any = await this.redisService.get(element);
      // update DB

      console.log('updating');

      await this.monitorService.create({
        userId: +userId,
        requestSuccess: payloadMonitor.countSuccess,
        requestTotal: payloadMonitor.countTotal || payloadMonitor.countSuccess,
      });

      this.redisService.del(element);
      // delete Record
      console.log('deleting');
    }
  }
}
