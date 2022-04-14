import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: AuthCredentialsDto) {
    const { email, password, username } = createUserDto;
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }

  findAll() {
    return `This action returns all user sdsfsd`;
  }

  find(email: string) {
    return this.repo.findOne({ email });
  }

  findOne(email: string) {
    return this.repo.findOne({ email });
  }

  findByClientId(clientId: string) {
    return this.repo.findOne({ clientId });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findBySecret(clientId: string, apikey: string) {
    return this.repo.findOne({ clientId, apikey });
  }
}
