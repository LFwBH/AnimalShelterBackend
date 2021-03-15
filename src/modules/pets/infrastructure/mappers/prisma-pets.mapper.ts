import { Prisma } from "@prisma/client";

import { PetEntity } from "../entities/pet.entity";

type PrismaPet = Prisma.PetGetPayload<unknown>;

export class PrismaPetsMapper {
  static async toPrismaPet(pet: PetEntity): Promise<PrismaPet> {
    return {
      age: pet.age,
      archive_date: pet.archiveDate,
      archived: pet.archived,
      came_from: pet.cameFrom,
      color: pet.color,
      created_at: pet.createdAt,
      description: pet.description,
      has_gone: pet.hasGone,
      id_pet: pet.id,
      kind: pet.kind,
      name: pet.name,
      passport: pet.passport,
      reviewed: pet.reviewed,
      sex: pet.sex,
      special: pet.special,
      sterilization_date: pet.sterilizationDate,
      sterilized: pet.sterilized,
      updated_at: pet.updatedAt,
    };
  }

  static async toEntityPet(pet: PrismaPet): Promise<PetEntity> {
    return PetEntity.new({
      age: pet.age,
      archived: pet.archived,
      archiveDate: pet.archive_date,
      cameFrom: pet.came_from,
      color: pet.color,
      createdAt: pet.created_at,
      description: pet.description,
      hasGone: pet.has_gone,
      id: pet.id_pet,
      kind: pet.kind,
      name: pet.name,
      passport: pet.passport,
      reviewed: pet.reviewed,
      sex: pet.sex,
      special: pet.special,
      sterilizationDate: pet.sterilization_date,
      sterilized: pet.sterilized,
      updatedAt: pet.updated_at,
    });
  }
}
