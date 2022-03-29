import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LicenseService } from './license.service';
import { LicenseController } from './license.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LicenseController],
  providers: [LicenseService],
})
export class LicenseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LicenseController);
  }
}
