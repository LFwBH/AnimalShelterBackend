import { Module } from "@nestjs/common";

import { PlacementsModule } from "../placements/placements.module";
import { PetsController } from "./application/controllers/pets.controller";
import { providers as applicationProviders } from "./application/providers";
import { providers as infrastructureProviders } from "./infrastructure/providers";

@Module({
  imports: [PlacementsModule],
  controllers: [PetsController],
  providers: [...infrastructureProviders, ...applicationProviders],
})
export class PetsModule {}
