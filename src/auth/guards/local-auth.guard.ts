import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   // const result = (await super.canActivate(context)) as boolean;
  //   // console.log(result);
  //   // if (context.getType() === 'http') {
  //   //   await super.logIn(request);
  //   // }
  //   // return result;
  //   const request = context.switchToHttp().getRequest();
  //   return true;
  // }
}
