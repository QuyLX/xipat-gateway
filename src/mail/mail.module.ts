import { Module } from '@nestjs/common';
import { MailProcessor } from './mail.processor';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: 'quylx@omegatheme.com',
            pass: '0comatkhau',
          },
        },
        defaults: {
          from: 'quylx',
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'mailsend',
    }),
  ],
  providers: [MailService, MailProcessor],
  controllers: [MailController],
})
export class MailModule {}
