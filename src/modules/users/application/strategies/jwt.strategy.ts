/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JWT_SECRET } from "../../constants/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(
    payload: Record<string, string>,
  ): Promise<Record<string, object>> {
    return {
      user: {
        id: payload.id,
        email: payload.email,
      },
    };
  }
}
