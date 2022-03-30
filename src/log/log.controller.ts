import { Controller } from '@nestjs/common';
import { LogsService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogsService) {}
}
