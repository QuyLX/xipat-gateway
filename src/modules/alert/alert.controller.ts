import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('alert')
export class AlertController {
  constructor(@InjectQueue('alert') private readonly alertQueue: Queue) {}

  @Post('transcode')
  async transcode() {
    await this.alertQueue.add(
      'transcode',
      {
        file: 'audio.mp3',
      },
      {
        delay: 10000,
      },
    );
  }
}
