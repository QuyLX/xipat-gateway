import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourierNotFound } from './entities/courier-not-found.entity';

@Injectable()
export class CourierNotFoundService {
  constructor(
    @InjectRepository(CourierNotFound)
    private repo: Repository<CourierNotFound>,
  ) {}

  create(tracking_id: string) {
    const courierNotFound = this.repo.create({ tracking_id });
    return this.repo.save(courierNotFound);
  }
}
