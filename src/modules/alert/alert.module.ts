import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { BullModule } from '@nestjs/bull';
import { AlertProcessor } from './alert.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'alert',
    }),
  ],
  controllers: [AlertController],
  providers: [AlertProcessor],
})
export class AlertModule {}
