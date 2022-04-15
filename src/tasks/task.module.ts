import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { HealthModule } from 'src/health/health.module';
import { RedisModule } from 'src/redis/redis.module';
import { MonitorModule } from 'src/features/monitor/monitor.module';

@Module({
  imports: [HealthModule, RedisModule, MonitorModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
