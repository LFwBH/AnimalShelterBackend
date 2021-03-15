import { Inject, Injectable } from "@nestjs/common";

import { CreatePetPort } from "../../domain/ports/create-pet.port";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { PetEntity } from "../../infrastructure/entities/pet.entity";

@Injectable()
export class CreatePetService implements CreatePetUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async execute(port: CreatePetPort): Promise<PetEntity> {
    const pet = await PetEntity.new(port);
    return this.petsRepository.create(pet);
  }
}
