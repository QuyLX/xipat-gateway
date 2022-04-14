import { IsArray } from 'class-validator';

interface TrackingInfo {
  courier: string;
  tracking_numbers: string;
}

export class TrackingMultipleDto {
  @IsArray()
  data: TrackingInfo[];
}
