import { Controller, Get, Param, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private emailService: MailService) {}
  @Get()
  testSendEmail(@Query() data: number) {
    this.emailService.sendConfirmationEmail(data);
    return 'fsdfs';
  }
}
