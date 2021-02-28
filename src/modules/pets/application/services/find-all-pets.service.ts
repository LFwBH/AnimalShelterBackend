import { Inject, Injectable } from "@nestjs/common";

import { Pet } from "../../domain/entities/pet.entity";
import { FindAllPetsPort } from "../../domain/ports/find-all-pets.port";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";

@Injectable()
export class FindAllPetsService implements FindAllPetsUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async execute(port: FindAllPetsPort): Promise<Iterable<Pet>> {
    return this.petsRepository.findAll(port);
  }
}