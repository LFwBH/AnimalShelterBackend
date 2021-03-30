import { Injectable } from "@nestjs/common";
import { Logger } from "nestjs-pino";

@Injectable()
export class PinoLoggerService extends Logger {}
