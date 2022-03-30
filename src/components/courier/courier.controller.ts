import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourierService } from './courier.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CourierDto } from './dto/courier.dto';
import { DectectCourierDto } from './dto/detect-courier.dto';

@Controller('courier')
@Serialize(CourierDto)
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.courierService.create(createCourierDto);
  }

  @Post('/detect-carrier')
  detectCarrier(@Body() detectPayload: DectectCourierDto) {
    return this.courierService.detectCourier(detectPayload);
  }

  @Get()
  findAll() {
    return this.courierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return this.courierService.update(+id, updateCourierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courierService.remove(+id);
  }
}
function ApiResponse(arg0: { status: number; description: string }) {
  throw new Error('Function not implemented.');
}
