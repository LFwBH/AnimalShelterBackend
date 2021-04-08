import { Injectable } from "@nestjs/common";
import { LostPet as PrismaLostPet } from "@prisma/client";
import { classToPlain, plainToClass } from "class-transformer";
import { EntityMapper } from "common/EntityMapper";

import { LostPetEntity } from "./lost-pet.entity";
import { LostPetModel } from "./lost-pet.model";

@Injectable()
export class LostPetMapper
  implements EntityMapper<PrismaLostPet, LostPetModel> {
  toEntity(lostPet: PrismaLostPet): LostPetModel {
    const lostPetEntity = plainToClass(LostPetEntity, {
      id: lostPet.id_lost_pet,
      description: lostPet.description,
      archived: lostPet.archived,
      archiveDate: lostPet.archive_date,
      createdAt: lostPet.created_at,
      updatedAt: lostPet.updated_at,
    });

    return classToPlain(lostPetEntity) as LostPetModel;
  }
}
