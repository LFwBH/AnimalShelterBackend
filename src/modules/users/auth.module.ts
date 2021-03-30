import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { JWT_SECRET } from "./constants/jwt";

const modules = [PassportModule, JwtModule.register({ secret: JWT_SECRET })];

@Module({
  imports: modules,
  exports: modules,
})
export class AuthModule {}
