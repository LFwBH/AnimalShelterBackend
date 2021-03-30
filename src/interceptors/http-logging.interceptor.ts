import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { CoreApiResponse } from "../common/CoreApiResponse";
import { LOGGER_SERVICE } from "../providers";

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(@Inject(LOGGER_SERVICE) private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CoreApiResponse<void>> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const requestStartDate: number = Date.now();

    return next.handle().pipe(
      tap((): void => {
        const requestFinishDate: number = Date.now();

        const message: string =
          `Method: ${request.method}; ` +
          `Path: ${request.path}; ` +
          `SpentTime: ${requestFinishDate - requestStartDate}ms`;

        this.logger.log(message, HttpLoggingInterceptor.name);
      }),
    );
  }
}
