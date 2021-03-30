import { Module } from "@nestjs/common";

import { AuthController } from "./application/controllers/auth.controller";
import { providers as applicationProviders } from "./application/providers";
import { AuthModule } from "./auth.module";
import { providers as infrastructureProviders } from "./infrastructure/providers";

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [...infrastructureProviders, ...applicationProviders],
})
export class UsersModule {}
