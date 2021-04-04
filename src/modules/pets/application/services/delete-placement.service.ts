import { Inject, Injectable } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
import { PetModel } from "../../domain/models/pet.model";
import { DeletePlacementPort } from "../../domain/ports/delete-placement.port";
import { PlacementRepositoryPort } from "../../domain/ports/placement-repository.port";
import { PETS_REPOSITORY, PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { DeletePlacementUseCase } from "../../domain/usecases/delete-placement.usecase";

@Injectable()
export class DeletePlacementService implements DeletePlacementUseCase {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly petsRepository: PetsRepository,
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepositoryPort,
  ) {}

  async execute(port: DeletePlacementPort): Promise<PetModel> {
    let pet = await this.petsRepository.findById(port.petId);

    if (!pet) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet not found",
      });
    }

    if (
      !pet.placements.some(
        (placement) =>
          placement.placementId === port.placementId &&
          placement.petId === port.petId,
      )
    ) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet placement not found",
      });
    }

    const placement = await this.placementRepository.findById(port.placementId);

    if (!placement) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Placement not found",
      });
    }

    await this.placementRepository.deletePlacementFromPet(port);

    pet = await this.petsRepository.findById(port.petId);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return pet!;
  }
}
