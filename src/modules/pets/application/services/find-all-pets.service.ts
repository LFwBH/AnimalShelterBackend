import { Inject, Injectable } from "@nestjs/common";
import { RepositoryPageOptions } from "common/RepositoryPageOptions";
import { PetModel } from "modules/pets/domain/models/pet.model";

import { Optional } from "../../../../common/Optional";
import { PetFilterPort } from "../../domain/ports/pet-filter.port";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";

@Injectable()
export class FindAllPetsService implements FindAllPetsUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  execute(
    port: RepositoryPageOptions & { filter: Optional<PetFilterPort> },
  ): Promise<Iterable<PetModel>> {
    return this.petsRepository.findAll(port);
  }
}
