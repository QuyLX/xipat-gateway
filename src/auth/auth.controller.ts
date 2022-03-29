import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthUser } from './auth.decorator';
import { User } from 'src/modules/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  sigin(@Body() body: SigninDto): Promise<{ accessToken: string }> {
    return this.authService.signin(body);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  signup(@Body() authPayload: AuthCredentialsDto) {
    return this.authService.signup(authPayload);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@AuthUser() req: User) {
    console.log(req);

    return req;
  }
}
