import { Expose } from 'class-transformer';

export class CourierDto {
  @Expose()
  name: string;

  @Expose()
  host: string;

  @Expose()
  code: string;
}
