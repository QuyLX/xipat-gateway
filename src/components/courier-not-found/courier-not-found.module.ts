import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourierNotFoundService } from './courier-not-found.service';
import { CourierNotFound } from './entities/courier-not-found.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourierNotFound])],
  providers: [CourierNotFoundService],
  exports: [CourierNotFoundService],
})
export class CourierNotFoundModule {}
