import { Module } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';
import { PaypalService } from './paypal/paypal.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { paypalUrl } from './constant';

@Module({
  imports: [
    HttpModule.register({
      baseURL: paypalUrl,
    }),
  ],
  providers: [StripeService, PaypalService],
  exports: [StripeService, PaypalService],
  controllers: [PaymentController],
})
export class PaymentModule {}
