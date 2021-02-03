import { Inject, Injectable, Logger } from "@nestjs/common";

import { Pet } from "../../domain/entities/pet.entity";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { PetsUseCase } from "../../domain/usecases/pets.usecase";

@Injectable()
export class PetsService implements PetsUseCase {
  private readonly logger = new Logger(PetsService.name);

  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async create(pet: Pet) {
    void pet;
  }

  async findAll() {
    return [];
  }

  async findOne(id: number) {
    this.logger.log(id);
    return null;
  }

  async update(id: number, pet: Pet) {
    void id;
    void pet;
  }

  async remove(id: number) {
    void id;
  }
}
