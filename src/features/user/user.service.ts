import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/auth/dto/auth.dto';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private redisService: RedisService,
  ) {}

  async create(createUserDto: AuthCredentialsDto) {
    const { email, password, username } = createUserDto;

    const user = this.repo.create({
      email,
      password,
      username,
    });

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

  async findBySecret(clientId: string, apikey: string) {
    const cacheUser = await this.redisService.get(`verify_${apikey}`);    
    if (!cacheUser) {
      const user = await this.repo.findOne({ clientId, apikey });
      this.redisService.set(`verify_${apikey}`, user);
      return user;
    }
    return cacheUser;
  }
}
