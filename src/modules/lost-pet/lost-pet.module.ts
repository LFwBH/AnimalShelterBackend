import { Module } from "@nestjs/common";
import { PrismaService } from "services/prisma.service";

import { LostPetController } from "./lost-pet.controller";
import { LostPetMapper } from "./lost-pet.mapper";

@Module({
  controllers: [LostPetController],
  providers: [PrismaService, LostPetMapper],
})
export class LostPetModule {}
