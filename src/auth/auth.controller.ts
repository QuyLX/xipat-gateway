import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/modules/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private userSerivce: UserService) {}
  @Post('/signin')
  sigin() {
    return 'safdsf';
  }

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.userSerivce.create(body);
  }
}
