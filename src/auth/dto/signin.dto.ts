import { IsOptional } from 'class-validator';
import { AuthCredentialsDto } from './auth.dto';

export class SigninDto extends AuthCredentialsDto {
  @IsOptional()
  username: string;
}
