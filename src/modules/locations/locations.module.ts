import { Module } from "@nestjs/common";

import { LocationController } from "./application/controllers/location.controller";
import { providers as applicationProviders } from "./application/providers";
import { providers as infrastructureProviders } from "./infrastructure/providers";

@Module({
  controllers: [LocationController],
  providers: [...infrastructureProviders, ...applicationProviders],
})
export class LocationsModule {}
