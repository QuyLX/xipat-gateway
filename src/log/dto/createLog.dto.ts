import { IsString } from 'class-validator';

export default class CrateLogDto {
  @IsString()
  level: string;

  @IsString()
  message: string;

  @IsString()
  context: string;
}
