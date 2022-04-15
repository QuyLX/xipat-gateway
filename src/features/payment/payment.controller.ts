import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal/paypal.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private paypalService: PaypalService,
  ) {}

  @Get('/paypal')
  async test() {
    return this.paypalService.getAccessToken();
  }

  @Post('paypal')
  async test2(@Body() data: any) {
    return this.paypalService.createProduct(data.data, data.token);
  }

  @Post('paypal/plan')
  async test3(@Body() data: any) {
    return this.paypalService.createPlan(data.data, data.token);
  }
}
