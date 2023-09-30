import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDto } from "src/users/dtos/user.dto";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //** Run something before a request handled */
    //** By the request handler */


    return handler.handle().pipe(
      map((data: any) => {
        //*** Run something before the response is send out */
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }
}