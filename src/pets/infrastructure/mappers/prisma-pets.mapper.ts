import { Prisma } from "@prisma/client";

import { Breed, Color, Pet, Sex } from "../../domain/entities/pet.entity";

type PrismaPet = Prisma.PetGetPayload<unknown>;

type PrismaPetWithBreedColorSex = Prisma.PetGetPayload<{
  include: {
    sex: true;
    color: true;
    breed: true;
  };
}>;

export class PrismaPetsMapper {
  static async toPrismaPet(pet: Pet): Promise<PrismaPet> {
    return {
      id_pet: pet.id,
      name: pet.name,
      description: pet.description,
      id_breed: pet.breed.id,
      age: pet.age,
      id_color: pet.breed.id,
      id_sex: pet.sex.id,
      special: pet.special,
    };
  }

  static async toEntityPet(pet: PrismaPetWithBreedColorSex): Promise<Pet> {
    const color = await Color.new({
      id: pet.color.id_color,
      name: pet.color.name,
    });
    const sex = await Sex.new({ id: pet.sex.id_sex, name: pet.sex.name });
    const breed = await Breed.new({
      id: pet.breed.id_breed,
      name: pet.breed.name,
    });

    return Pet.new({
      id: pet.id_pet,
      name: pet.name,
      description: pet.description,
      age: pet.age,
      special: pet.special,
      color,
      sex,
      breed,
    });
  }
}
