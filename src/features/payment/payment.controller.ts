import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import CreateChargeDto from './dto/createCharge.dto';
import { StripeService } from './stripe/stripe.service';
import { PaypalService } from './paypal/paypal.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private stripeService: StripeService,
    private paypalService: PaypalService,
  ) {}

  @Post()
  // @UseGuards(JwtAuthenticationGuard)
  async createCharge(@Body() charge: CreateChargeDto, @Req() request: any) {
    await this.stripeService.charge(
      charge.amount,
      charge.paymentMethodId,
      request.user.stripeCustomerId,
    );
  }

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
