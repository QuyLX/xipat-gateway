import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Im attack from interceptor before handle request');
    // return next
    //   .handle()
    //   .pipe(
    //     tap(() =>
    //       console.log(`Im attack from interceptor after handle request`),
    //     ),
    //   );
    const request = context.switchToHttp().getRequest();

    request.admin = 'admin from intercepor';

    return next.handle().pipe(
      map((data) => {
        console.log('Im attack from interceptor after handle request');
        return { result: data + 'hihi' };
      }),
    );
  }
}
