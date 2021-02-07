import { Module } from "@nestjs/common";

import { PetsController } from "./application/controllers/pets.controller";
import { providers as applicationProviders } from "./application/providers";
import { provider as infrastructureProviders } from "./infrastructure/providers";

@Module({
  controllers: [PetsController],
  providers: [...infrastructureProviders, ...applicationProviders],
})
export class PetsModule {}
