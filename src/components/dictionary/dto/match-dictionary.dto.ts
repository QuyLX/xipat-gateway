import { IsString } from 'class-validator';

export class MatchDictonaryDto {
  @IsString()
  carrier_name: string;
}
