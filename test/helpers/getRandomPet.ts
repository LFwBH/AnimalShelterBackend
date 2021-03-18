import * as faker from "faker";

import { PetModel } from "../../src/modules/pets/domain/models/pet.model";
import { PetEntity } from "../../src/modules/pets/infrastructure/entities/pet.entity";

export default async function getRandomPet(
  overrides?: Partial<PetEntity>,
): Promise<PetModel> {
  return PetEntity.new({
    age: overrides?.age ?? faker.random.number(),
    archived: overrides?.archived ?? faker.random.boolean(),
    archiveDate: overrides?.archiveDate ?? faker.date.past(),
    cameFrom: overrides?.cameFrom ?? faker.lorem.paragraph(),
    color: overrides?.color ?? faker.internet.color(),
    createdAt: overrides?.createdAt ?? faker.date.recent(),
    description: overrides?.description ?? faker.lorem.sentence(),
    hasGone: overrides?.hasGone ?? faker.random.boolean(),
    id: overrides?.id ?? faker.random.number(),
    kind: overrides?.kind ?? getRandomOneOf(["Dog", "Cat"]),
    name: overrides?.name ?? faker.name.findName(),
    passport: overrides?.passport ?? faker.random.boolean(),
    reviewed: overrides?.reviewed ?? faker.random.boolean(),
    sex: overrides?.sex ?? getRandomOneOf(["Boy", "Girl"]),
    special: overrides?.special ?? faker.random.boolean(),
    sterilizationDate: overrides?.sterilizationDate ?? faker.date.past(),
    sterilized: overrides?.sterilized ?? faker.random?.boolean(),
    updatedAt: overrides?.updatedAt ?? faker.date.recent(),
  });
}

export function getRandomOneOf<T>(values: T[]): T {
  return values[Math.floor(Math.random() * values.length)];
}
