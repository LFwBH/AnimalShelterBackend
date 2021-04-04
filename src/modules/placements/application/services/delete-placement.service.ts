import { Inject } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
import { PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PlacementRepository } from "../../domain/repositories/placement.repository";
import { DeletePlacementUseCase } from "../../domain/usecases/delete-placement.usecase";

export class DeletePlacementService implements DeletePlacementUseCase {
  constructor(
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepository,
  ) {}

  async execute(port: number): Promise<void> {
    const placement = await this.placementRepository.findById(port);

    if (!placement) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Placement not found",
      });
    }

    if (placement.petPlacements.length > 0) {
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        message: "Placement foreign constraint error",
      });
    }

    await this.placementRepository.delete(port);
  }
}
