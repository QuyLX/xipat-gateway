import { Injectable } from '@nestjs/common';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { MatchDictonaryDto } from './dto/match-dictionary.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary) private repo: Repository<Dictionary>,
  ) {}
  create(createDictionaryDto: CreateDictionaryDto) {
    return 'This action adds a new dictionary';
  }

  async findAll(carrier_name: string) {
    const result = await this.repo
      .createQueryBuilder('dictionary')
      .where(
        `LOCATE(CONCAT(',',
        '${carrier_name.trim()}'
        ,','),CONCAT(',',list_courier_name,',')) > 0`,
      )
      .getOne();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} dictionary`;
  }

  update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    return `This action updates a #${id} dictionary`;
  }

  remove(id: number) {
    return `This action removes a #${id} dictionary`;
  }
}
