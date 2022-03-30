import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { CourierNotFoundModule } from '../courier-not-found/courier-not-found.module';
import { HttpModule } from '@nestjs/axios';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';

@Module({
  imports: [
    DictionaryModule,
    CourierNotFoundModule,
    HttpModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
      storage: new ThrottlerStorageRedisService(),
    }),
  ],
  providers: [TrackingService],
  controllers: [TrackingController],
})
export class TrackingModule {
  configure(consumer: MiddlewareConsumer) {}
}
