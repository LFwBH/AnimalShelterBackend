import { Inject } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
import { PetModel } from "../../domain/models/pet.model";
import { UpdatePetPort } from "../../domain/ports/update-pet.port";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { UpdatePetUseCase } from "../../domain/usecases/update-pet.usecase";

export class UpdatePetService implements UpdatePetUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async execute(port: UpdatePetPort): Promise<PetModel> {
    const petExists = await this.petsRepository.findById(port.id);

    if (!petExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet not found",
      });
    }

    return this.petsRepository.update(port);
  }
}
