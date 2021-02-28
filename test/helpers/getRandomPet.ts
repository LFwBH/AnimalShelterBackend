import * as faker from "faker";

import { Breed } from "../../src/pets/domain/entities/breed.entity";
import { Color } from "../../src/pets/domain/entities/color.entity";
import { Pet } from "../../src/pets/domain/entities/pet.entity";
import { Sex } from "../../src/pets/domain/entities/sex.entity";

export default async function getRandomPet(
  overrides?: Partial<
    Omit<Pet, "color" | "breed" | "sex"> & {
      colorId: number;
      sexId: number;
      breedId: number;
    }
  >,
): Promise<Pet> {
  const color = await Color.new({
    id: overrides?.colorId ?? faker.random.number({ min: 1, max: 6 }),
    name: faker.random.word(),
  });

  const breed = await Breed.new({
    id: overrides?.breedId ?? faker.random.number({ min: 1, max: 10 }),
    name: faker.random.word(),
  });

  const sex = await Sex.new({
    id: overrides?.sexId ?? faker.random.number({ min: 1, max: 2 }),
    name: faker.random.word(),
  });

  return Pet.new({
    id: overrides?.id ?? faker.random.number(),
    name: overrides?.name ?? faker.name.findName(),
    description: overrides?.description ?? faker.lorem.sentence(),
    special: overrides?.special ?? faker.random.boolean(),
    age: overrides?.age ?? faker.random.number(),
    color,
    breed,
    sex,
    createdAt: overrides?.createdAt ?? faker.date.recent(),
    updatedAt: overrides?.updatedAt ?? faker.date.recent(),
  });
}
