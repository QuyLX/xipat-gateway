import { SigninDto } from './signin.dto';
import { IsString } from 'class-validator';

export class SignupDto extends SigninDto {
  @IsString()
  confirmPassword: string;

  @IsString()
  username: string
}
