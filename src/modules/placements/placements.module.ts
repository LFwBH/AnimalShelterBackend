import { Module } from "@nestjs/common";

import { PlacementsController } from "./application/controllers/placements.controller";
import { providers as applicationProviders } from "./application/providers";
import { providers as infrastructureProviders } from "./infrastructure/providers";

@Module({
  controllers: [PlacementsController],
  providers: [...infrastructureProviders, ...applicationProviders],
})
export class PlacementsModule {}
