import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/author/decorators/role.decorator';
import { Role } from 'src/author/enums/role.enum';
import { RolesGuard } from 'src/author/guards/role-base-access.guard';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private healthCheckService: HealthService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @HealthCheck()
  async checkService() {
    await this.healthCheckService.check();
  }
}
