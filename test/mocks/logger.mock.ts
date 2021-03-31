import { LoggerService } from "@nestjs/common";

export class LoggerMock implements LoggerService {
  log() {}

  error() {}

  warn() {}
}
