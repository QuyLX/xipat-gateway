import { Module } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { BullModule } from '@nestjs/bull';
import { AlertProcessor } from './alert.processor';
import { join } from 'path';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'alert',
      processors: [
        {
          name: 'optimize',
          path: join(__dirname, 'alert.processor.js'),
        },
      ],
    }),
  ],
  controllers: [AlertController],
  providers: [AlertProcessor],
})
export class AlertModule {}
