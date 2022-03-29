import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerBehindProxyGuard } from 'src/common/guards/throttler-behind-proxy.guard';
import { CourierNotFoundService } from '../courier-not-found/courier-not-found.service';
import { DictionaryService } from '../dictionary/dictionary.service';
import { TrackingMultipleDto } from './dtos/tracking-multiple.dto';
import { TrackingSingleDto } from './dtos/tracking-single.dto';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(
    private dictionaryService: DictionaryService,
    private trackingService: TrackingService,
    private courierNotfoundService: CourierNotFoundService,
  ) {}
  s;
  @Post('/single')
  async getSingleTrackingInfo(@Body() data: TrackingSingleDto) {
    const { carrier_name, tracking_number } = data;
    const hasDictionary = await this.dictionaryService.findAll(carrier_name);
    if (hasDictionary) {
      return this.trackingService.getSingleTracking(data);
    } else {
      this.courierNotfoundService.create(tracking_number);
      throw new NotFoundException('Courier not supported ');
    }
  }

  @Post('/multiple')
  getMultipleTrackingInfo(@Body() data: TrackingMultipleDto) {
    return 'sdfds';
  }

  @UseGuards(ThrottlerBehindProxyGuard)
  @Get('/test')
  testRateLimit() {}

  @Get('/test2')
  test2() {}
}
function ApiResponse(arg0: { status: number; description: string }) {
  throw new Error('Function not implemented.');
}
