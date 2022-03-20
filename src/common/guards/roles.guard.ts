import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Im attack from role guard');

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // console.log(request.roles);

    return true;
  }
}
function matchRoles(roles, param) {
  return true;
}
