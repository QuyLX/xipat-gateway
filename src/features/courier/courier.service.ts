import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { Courier } from './entities/courier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DectectCourierDto } from './dto/detect-courier.dto';

@Injectable()
export class CourierService {
  constructor(@InjectRepository(Courier) private repo: Repository<Courier>) {}

  async detectCourier(payload: DectectCourierDto) {
    const { tracking_number, tracking_url } = payload;
    const { hostname } = new URL(tracking_url);
    const listCourier = await this.repo.find();
    let listMatchCourier: any[] = [];
    try {
      listCourier.forEach((courier) => {
        if (courier.website && hostname !== '') {
          const { hostname: courierHost } = new URL(courier.website);
          if (hostname === courierHost) {
            let pushData = {
              name: courier.display_name,
              code: courier.name,
            };
            listMatchCourier.push(pushData);
          }
        }

        if (courier.pattern) {
          if (tracking_number.match(courier.pattern)) {
            let pushData = {
              name: courier.display_name,
              code: courier.name,
            };
            listMatchCourier.push(pushData);
          }
        }
      });
      console.log(listMatchCourier);
    } catch (error) {}
    return listMatchCourier;
  }

  create(createCourierDto: CreateCourierDto) {
    return 'This action adds a new courier';
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} courier`;
  }

  update(id: number, updateCourierDto: UpdateCourierDto) {
    return `This action updates a #${id} courier`;
  }

  remove(id: number) {
    return `This action removes a #${id} courier`;
  }
}
