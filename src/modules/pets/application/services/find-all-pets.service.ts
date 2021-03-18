import { Inject, Injectable } from "@nestjs/common";
import { RepositoryPageOptions } from "common/RepositoryPageOptions";
import { PetModel } from "modules/pets/domain/models/pet.model";

import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";

@Injectable()
export class FindAllPetsService implements FindAllPetsUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  execute(port: RepositoryPageOptions): Promise<Iterable<PetModel>> {
    return this.petsRepository.findAll(port);
  }
}
