import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { classToPlain, plainToClass } from "class-transformer";
import { EntityMapper } from "common/EntityMapper";

import { PrismaPetsMapper } from "../pets/infrastructure/mappers/prisma-pets.mapper";
import { FavoritePetEntity } from "./favorite-pet.entity";
import { FavoritePetModel } from "./favorite-pet.model";

type PrismaFavoritePet = Prisma.FavoritePetGetPayload<{
  include: { pet: true };
}>;

@Injectable()
export class FavoritePetMapper
  implements EntityMapper<PrismaFavoritePet, Promise<FavoritePetModel>> {
  async toEntity(favoritePet: PrismaFavoritePet): Promise<FavoritePetModel> {
    const favoritePetEntity = plainToClass(FavoritePetEntity, {
      id: favoritePet.id_favorite_pet,
      createdAt: favoritePet.created_at,
      updatedAt: favoritePet.updated_at,
      pet: await PrismaPetsMapper.toEntityPet(favoritePet.pet),
    });

    return classToPlain(favoritePetEntity) as FavoritePetModel;
  }
}
