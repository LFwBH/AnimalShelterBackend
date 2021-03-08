import { Inject, Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { Pet } from "../../domain/entities/pet.entity";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { FindPetByIdUseCase } from "../../domain/usecases/find-by-id.usecase";

@Injectable()
export class FindPetByIdService implements FindPetByIdUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async execute(port: number): Promise<Optional<Pet>> {
    return this.petsRepository.findById(port);
  }
}
