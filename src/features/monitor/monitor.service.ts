import { Injectable } from '@nestjs/common';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitor } from './entities/monitor.entity';

@Injectable()
export class MonitorService {
  constructor(@InjectRepository(Monitor) private repo: Repository<Monitor>) {}
  create(createMonitorDto: CreateMonitorDto) {
    const { userId, requestSuccess, requestTotal } = createMonitorDto;

    const record = this.repo.create({
      userId,
      requestSuccess,
      requestTotal,
    });

    return this.repo.save(record);
  }

  findAll() {
    return `This action returns all monitor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} monitor`;
  }

  update(id: number, updateMonitorDto: UpdateMonitorDto) {
    return `This action updates a #${id} monitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} monitor`;
  }
}
