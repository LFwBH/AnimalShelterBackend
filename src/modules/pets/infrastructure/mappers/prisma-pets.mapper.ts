import { Prisma } from "@prisma/client";

import { PrismaPetPlacementMapper } from "../../../placements/infrastructure/mappers/prisma-pet-placement.mapper";
import { PetEntity } from "../entities/pet.entity";

type PrismaPet = Prisma.PetGetPayload<null>;

type PrismaPetWithPlacements = Prisma.PetGetPayload<{
  include: { PetPlacement: true };
}>;

export class PrismaPetsMapper {
  static async toPrismaPet(pet: PetEntity): Promise<PrismaPet> {
    return {
      age: pet.age,
      archive_date: pet.archiveDate ?? null,
      archived: pet.archived,
      came_from: pet.cameFrom,
      color: pet.color,
      created_at: pet.createdAt,
      description: pet.description,
      dead: pet.dead,
      id_pet: pet.id,
      kind: pet.kind,
      name: pet.name,
      passport: pet.passport,
      reviewed: pet.reviewed,
      sex: pet.sex,
      special: pet.special,
      sterilization_date: pet.sterilizationDate ?? null,
      sterilized: pet.sterilized,
      updated_at: pet.updatedAt,
    };
  }

  static async toPrismaPetWithPlacements(
    pet: PetEntity,
  ): Promise<PrismaPetWithPlacements> {
    const prismaPet = await this.toPrismaPet(pet);

    const prismaPetPlacements = await Promise.all(
      pet.placements.map((placement) =>
        PrismaPetPlacementMapper.toPrismaPetPlacement(placement),
      ),
    );

    return {
      ...prismaPet,
      PetPlacement: prismaPetPlacements,
    };
  }

  static async toEntityPet(pet: PrismaPet): Promise<PetEntity> {
    return PetEntity.new({
      age: pet.age,
      archived: pet.archived,
      archiveDate: pet.archive_date ?? undefined,
      cameFrom: pet.came_from ?? undefined,
      color: pet.color,
      createdAt: pet.created_at,
      description: pet.description,
      dead: pet.dead,
      id: pet.id_pet,
      kind: pet.kind,
      name: pet.name,
      passport: pet.passport,
      reviewed: pet.reviewed,
      sex: pet.sex,
      special: pet.special,
      sterilizationDate: pet.sterilization_date ?? undefined,
      sterilized: pet.sterilized,
      updatedAt: pet.updated_at,
    });
  }

  static async toEntityPetWithPlacements(
    pet: PrismaPetWithPlacements,
  ): Promise<PetEntity> {
    const petEntity = await this.toEntityPet(pet);

    const petPlacementEntities = await Promise.all(
      pet.PetPlacement.map((placement) =>
        PrismaPetPlacementMapper.toEntityPetPlacement(placement),
      ),
    );

    return PetEntity.new({
      ...petEntity,
      placements: petPlacementEntities,
    });
  }
}
