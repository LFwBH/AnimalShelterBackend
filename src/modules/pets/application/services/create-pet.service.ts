import { Inject, Injectable } from "@nestjs/common";
import { PetModel } from "modules/pets/domain/models/pet.model";

import { CreatePetPort } from "../../domain/ports/create-pet.port";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";

@Injectable()
export class CreatePetService implements CreatePetUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  execute(port: CreatePetPort): Promise<PetModel> {
    return this.petsRepository.create(port);
  }
}
