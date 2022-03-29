import { IsString } from 'class-validator';

export class TrackingSingleDto {
  @IsString()
  carrier_name: string;
  @IsString()
  tracking_number: string;
  @IsString()
  client_id: string;
  @IsString()
  source: string;
  @IsString()
  order_id: string;
}
