import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm'; 

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const users = await this.find(email);
    console.log(createUserDto);

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  find(email: string) {
    return 'im finding user';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
