import { Inject, Injectable } from "@nestjs/common";
import { PetModel } from "modules/pets/domain/models/pet.model";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
import { Optional } from "../../../../common/Optional";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { FindPetByIdUseCase } from "../../domain/usecases/find-by-id.usecase";

@Injectable()
export class FindPetByIdService implements FindPetByIdUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
  ) {}

  async execute(port: number): Promise<Optional<PetModel>> {
    const pet = await this.petsRepository.findById(port);

    if (!pet) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet not found",
      });
    }

    return pet;
  }
}
