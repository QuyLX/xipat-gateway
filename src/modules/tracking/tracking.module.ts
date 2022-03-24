import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Module({
  providers: [TrackingService],
})
export class TrackingModule {
  configure(consumer: MiddlewareConsumer) {}
}
