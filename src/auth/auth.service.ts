import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { AuthCredentialsDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException('Your password incomplete!');
    }
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;
    const { email } = payload;
    try {
      user = await this.userService.findOne(email);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`,
      );
    }
    return user;
  }

  async signup(body: AuthCredentialsDto) {
    return this.userService.create(body);
  }

  async signin(user: SigninDto) {
    const { email } = user;
    const payload: JwtPayload = {
      email,
    };

    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
