import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/features/user/entities/user.entity';

export const AuthUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
