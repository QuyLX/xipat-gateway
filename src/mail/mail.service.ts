import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export interface User {
  email: string;
}

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mailsend')
    private mailQueue: Queue,
    private readonly mailerService: MailerService,
  ) {}

  async sendConfirmationEmail(data: any): Promise<boolean> {
    const test = [1, 2, 3, 4];
    try {
      for (let index = 0; index < test.length; index++) {
        const element = test[index];
        this.mailQueue.add(
          'confirmation',
          {
            data: element,
          },
          {
            lifo: true,
          },
        );
      }
      return true;
    } catch (err) {
      console.log('Error queueing confirmation email to user.');
      throw err;
      // return false;
    }
  }

  public async sendMail() {
    try {
      const data = await this.mailerService.sendMail({
        to: 'quylx@omegatheme.com',
        from: 'quylx@omegatheme.com',
        subject: 'Testing Nest MailerModule',
        text: 'welcome',
        html: '<b>welcome</b>', // HTML body content
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
