import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Observable } from 'rxjs';

@Injectable()
export class HealthService {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}
  @HealthCheck()
  async check() {
    try {
      const data = await this.healthCheckService.check([
        () => this.typeOrmHealthIndicator.pingCheck('database'),
        () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        () =>
          this.microservice.pingCheck('redis', {
            transport: Transport.REDIS,
            options: {
              url: 'redis://127.0.0.1:6379',
            },
          }),
      ]);
      return data;
    } catch (error) {
      
    }
  }
}
