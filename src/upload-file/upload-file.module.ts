import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocalFile from './entities/localFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
