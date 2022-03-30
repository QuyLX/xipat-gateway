import { IsString } from 'class-validator';

export class DectectCourierDto {
  @IsString()
  tracking_number: string;

  @IsString()
  tracking_url: string;
}
