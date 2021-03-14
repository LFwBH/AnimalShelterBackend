import { Prisma } from "@prisma/client";

import { PetEntity } from "../entities/pet.entity";

type PrismaPet = Prisma.PetGetPayload<unknown>;

export class PrismaPetsMapper {
  static async toPrismaPet(pet: PetEntity): Promise<PrismaPet> {
    return {
      id_pet: pet.id,
      name: pet.name,
      description: pet.description,
      kind: pet.kind,
      age: pet.age,
      sex: pet.sex,
      color: pet.color,
      special: pet.special,
      created_at: pet.createdAt,
      updated_at: pet.updatedAt,
    };
  }

  static async toEntityPet(pet: PrismaPet): Promise<PetEntity> {
    return PetEntity.new({
      id: pet.id_pet,
      name: pet.name,
      description: pet.description,
      age: pet.age,
      special: pet.special,
      color: pet.color,
      sex: pet.sex,
      kind: pet.kind,
      createdAt: pet.created_at,
      updatedAt: pet.updated_at,
    });
  }
}
