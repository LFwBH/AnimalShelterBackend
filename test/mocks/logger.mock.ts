import { LoggerService } from "@nestjs/common";

export class LoggerMock implements LoggerService {
  log(message: any, context?: string) {}

  error(message: any, trace?: string, context?: string) {}

  warn(message: any, context?: string) {}
}
