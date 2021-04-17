import { Module } from "@nestjs/common";

import { PrismaService } from "../../services/prisma.service";
import { FavoritePetController } from "./favorite-pet.controller";
import { FavoritePetMapper } from "./favorite-pet.mapper";

@Module({
  controllers: [FavoritePetController],
  providers: [PrismaService, FavoritePetMapper],
})
export class FavoritePetModule {}
