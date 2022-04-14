import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/features/user/user.service';
import { LicenseService } from 'src/features/license/license.service';
@Injectable()
export class TrackingMiddleWare implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private licenseService: LicenseService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const decoded: string = this.licenseService.decode(token);
      const [apikey, clientId] = decoded.split(':');

      const user = await this.userService.findBySecret(clientId, apikey);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
