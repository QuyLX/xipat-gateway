import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LicenseService } from '../license/license.service';

@Controller({
  version: ['1', '2'],
  path: 'user',
})
export class UserController {
  constructor(
    private readonly userService: UserService,
    private licenseService: LicenseService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Version('1')
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Version('2')
  @Get()
  findAllV2(): string {
    return 'This action returns all cats for version 2';
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('token')
  generateToken() {
    return this.licenseService.encode(
      'dfdsfdsfdsfdsfdgdfgfdg',
      '43243423432423423',
    );
  }
}
