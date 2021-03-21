import { Inject, Injectable } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
import { PetModel } from "../../domain/models/pet.model";
import { AddPlacementPort } from "../../domain/ports/add-placement.port";
import { PETS_REPOSITORY, PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { AddPlacementUseCase } from "../../domain/usecases/add-placement.usecase";
import { PlacementRepositoryPort } from "../ports/placement-repository.port";

@Injectable()
export class AddPlacementService implements AddPlacementUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepositoryPort,
  ) {}

  async execute(port: AddPlacementPort): Promise<PetModel> {
    let pet = await this.petsRepository.findById(port.petId);

    if (!pet) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet not found",
      });
    }

    if (pet.placements.some((placement) => placement.id === port.placementId)) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        message: "Pet already has this place",
      });
    }

    const placement = await this.placementRepository.findById(port.placementId);

    if (!placement) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Placement not found",
      });
    }

    await this.placementRepository.addPlacementToPet(port);

    pet = await this.petsRepository.findById(port.petId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return pet!;
  }
}
