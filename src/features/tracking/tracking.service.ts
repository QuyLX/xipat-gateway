import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { TrackingSingleDto } from './dtos/tracking-single.dto';

@Injectable()
export class TrackingService {
  constructor(private httpService: HttpService) {}

  async getSingleTracking(data: TrackingSingleDto) {
    const { carrier_name, tracking_number, client_id, order_id, source } = data;

    // get courier info

    // check 0 co thi insert vao bang courier

    // tracking sang core

    const response: Observable<AxiosResponse<any>> = this.httpService.get(
      'https://jsonplaceholder.typicode.com/posts',
    );

    return response.pipe(map((res) => res.data));
  }

  async getMultipleTracking() {
    // Get courier info

    // call api get tracking from core

    console.log('Im going multiple tracking');
  }
}
