import { Injectable } from '@nestjs/common';

@Injectable()
export class LicenseService {
  constructor() {}
  encode(apikey: string, clientId: string): string {
    const text = `${apikey}:${clientId}`;
    const buff = Buffer.from(text, 'utf-8');
    return buff.toString('base64');
  }

  decode(hash: string): string {
    const buff = Buffer.from(hash, 'base64');
    return buff.toString('utf-8');
  }
}
