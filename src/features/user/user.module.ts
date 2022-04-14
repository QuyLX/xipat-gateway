import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './entity-subcribers/user-subcriber';
import { LicenseModule } from '../license/license.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LicenseModule],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule {}
