import { Inject, Injectable } from "@nestjs/common";

import { Breed, Color, Pet, Sex } from "../../domain/entities/pet.entity";
import { CreatePetPort } from "../../domain/ports/create-pet.port";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";

@Injectable()
export class CreatePetService implements CreatePetUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async execute(port: CreatePetPort): Promise<Pet> {
    const breed = await Breed.new({ id: port.breedId, name: undefined });
    const sex = await Sex.new({ id: port.sexId, name: undefined });
    const color = await Color.new({ id: port.colorId, name: undefined });

    const pet = await Pet.new({
      id: undefined,
      age: port.age,
      name: port.name,
      special: port.special,
      description: port.description,
      breed,
      sex,
      color,
      createdAt: undefined,
      updatedAt: undefined,
    });

    return this.petsRepository.create(pet);
  }
}
