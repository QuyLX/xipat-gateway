import { Module } from '@nestjs/common';
import { LogsService } from './log.service';
import { LogController } from './log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Log from './entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogController],
  providers: [LogsService],
})
export class LogModule {}
