import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';


interface Post {
  userId: Number;
  id: Number;
  title: String;
  body: String;
}

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private httpService: HttpService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: any) {
    return this.authService.login(req);
  }

  // @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('profile')
  getProfile(@Param() req: any) {
    return req.user;
  }

  @Get('abc')
  test(@Param() req: any) {
    return 'aabcd';
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('http')
  async testHttp() {
    const response: Observable<AxiosResponse<any>> = this.httpService.get(
      'https://jsonplaceholder.typicode.com/posts',
    );

    return response.pipe(map((res) => res.data));
  }

  @Get()
  @Roles('admin')
  // @SetMetadata('roles', ['admin'])
  // @UseGuards(RolesGuard)
  findAll(@Req() request: any) {
    console.log(`${request.admin} tao nhan duoc roi nhe`);

    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
