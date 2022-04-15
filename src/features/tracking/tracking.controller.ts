import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerBehindProxyGuard } from 'src/guards/throttler-behind-proxy.guard';
import { CourierNotFoundService } from '../courier-not-found/courier-not-found.service';
import { DictionaryService } from '../dictionary/dictionary.service';
import { TrackingMultipleDto } from './dtos/tracking-multiple.dto';
import { TrackingSingleDto } from './dtos/tracking-single.dto';
import { TrackingService } from './tracking.service';
import { CountTrackingGuard } from 'src/guards/count-tracking.guard';

@Controller('tracking')
export class TrackingController {
  constructor(
    private dictionaryService: DictionaryService,
    private trackingService: TrackingService,
    private courierNotfoundService: CourierNotFoundService,
  ) {}

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
  @UseGuards(CountTrackingGuard)
  @Get('/test')
  testRateLimit() {
    return 'hi there!';
  }
}
