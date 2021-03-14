import * as faker from "faker";

import { PetEntity } from "../../src/modules/pets/infrastructure/entities/pet.entity";

export default async function getRandomPet(
  overrides?: Partial<PetEntity>,
): Promise<PetEntity> {
  return PetEntity.new({
    id: overrides?.id ?? faker.random.number(),
    name: overrides?.name ?? faker.name.findName(),
    description: overrides?.description ?? faker.lorem.sentence(),
    special: overrides?.special ?? faker.random.boolean(),
    age: overrides?.age ?? faker.random.number(),
    color: overrides?.color ?? faker.internet.color(),
    kind: overrides?.kind ?? getRandomOneOf(["Dog", "Cat"]),
    sex: overrides?.sex ?? getRandomOneOf(["Boy", "Girl"]),
    createdAt: overrides?.createdAt ?? faker.date.recent(),
    updatedAt: overrides?.updatedAt ?? faker.date.recent(),
  });
}

export function getRandomOneOf<T>(values: T[]): T {
  return values[Math.floor(Math.random() * values.length)];
}
