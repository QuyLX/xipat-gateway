import { Module } from '@nestjs/common';
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
  providers: [PaypalService],
  exports: [PaypalService],
  controllers: [PaymentController],
})
export class PaymentModule {}
