import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';

@Injectable()
export class PaypalService {
  constructor(
    protected configService: ConfigService,
    private httpService: HttpService,
  ) {}

  private getBasicKey() {
    return Buffer.from(
      this.configService.get('PAYPAL_CLIENT_ID') +
        ':' +
        this.configService.get('PAYPAL_CLIENT_SECRET'),
    ).toString('base64');
  }

  getAccessToken(): Observable<AxiosResponse> {
    const basicKey = this.getBasicKey();
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    return this.httpService
      .post(`/v1/oauth2/token`, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicKey}`,
          Acept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  createProduct(data: any, token: string): Observable<AxiosResponse> {
    return this.httpService
      .post(`/v1/catalogs/products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Acept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  createPlan(data: any, token: string): Observable<AxiosResponse> {
    return this.httpService
      .post(`v1/billing/plans`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Acept: 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }
}
