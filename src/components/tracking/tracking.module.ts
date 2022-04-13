import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { CourierNotFoundModule } from '../courier-not-found/courier-not-found.module';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { ThrottlerBehindProxyGuard } from 'src/guards/throttler-behind-proxy.guard';
@Module({
  imports: [
    DictionaryModule,
    CourierNotFoundModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: [RedisService],
      useFactory: (redisService: RedisService) => ({
        storage: redisService,
      }),
    }),
    RedisModule,
  ],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {
  configure(consumer: MiddlewareConsumer) {}
}
