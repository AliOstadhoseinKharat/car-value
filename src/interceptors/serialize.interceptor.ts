import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //** Run something before a request handled */
    //** By the request handler */
    console.log("I'm running before the handler", context);

    return handler.handle().pipe(
      map((data: any) => {
        //*** Run something before the response is send out */
        console.log("I'm running before response is send out", data);
      }),
    );
  }
}
