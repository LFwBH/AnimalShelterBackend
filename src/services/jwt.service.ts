/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";

import { Nullable } from "../common/Nullable";
import { TokenService } from "../common/TokenService";

@Injectable()
export class JwtService implements TokenService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: string | object | Buffer): string {
    return this.jwtService.sign(payload);
  }

  decode(token: string): Nullable<string | Record<string, unknown>> {
    return this.jwtService.decode(token);
  }

  verify<T extends object>(token: string): T {
    return this.jwtService.verify(token);
  }
}
