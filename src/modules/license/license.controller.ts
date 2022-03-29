import { Body, Controller, Post } from '@nestjs/common';
import { LicenseService } from './license.service';

@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Post()
  generateSecretKey(@Body() body: any) {
    return 'Fdsfs';
  }
}
