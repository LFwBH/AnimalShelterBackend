import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  LoggerService,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response } from "express";

import { Code } from "../common/Code";
import { CoreApiResponse } from "../common/CoreApiResponse";
import { Exception } from "../common/Exception";
import { LOGGER_SERVICE } from "../providers";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(LOGGER_SERVICE) private readonly logger: LoggerService) {}

  catch(error: Error, host: ArgumentsHost): void {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    const status =
      error instanceof Exception ? error.status : errorResponse.code;

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    const message: string =
      `Method: ${request.method}; ` +
      `Path: ${request.path}; ` +
      `Error: ${errorResponse.message}`;

    this.logger.error(message, error.stack);

    response.status(status).json(errorResponse);
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(
        error.getStatus(),
        error.message,
        error.getResponse(),
      );
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null,
      );
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(
        error.code,
        error.message,
        error.data,
      );
    }

    return errorResponse;
  }
}
