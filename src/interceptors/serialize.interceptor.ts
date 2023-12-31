import {
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//*** Interface for dto class */
interface classConstructor {
  new (...args: any[]): {};
}

//**** decorator for SerializeInterceptor */
export function serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: classConstructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //** Run something before a request handled */
    //** By the request handler */

    return handler.handle().pipe(
      map((data: classConstructor) => {
        //*** Run something before the response is send out */
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
