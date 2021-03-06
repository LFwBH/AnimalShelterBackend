import { Inject, Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { AddPlacementPort } from "../../../pets/domain/ports/add-placement.port";
import { DeletePlacementPort } from "../../../pets/domain/ports/delete-placement.port";
import { PlacementRepositoryPort } from "../../../pets/domain/ports/placement-repository.port";
import { PlacementModel } from "../../domain/models/placement.model";
import { PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PlacementRepository } from "../../domain/repositories/placement.repository";

@Injectable()
export class PlacementRepositoryAdapter implements PlacementRepositoryPort {
  constructor(
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepository,
  ) {}

  findById(id: number): Promise<Optional<PlacementModel>> {
    return this.placementRepository.findById(id);
  }

  addPlacementToPet(petPlacement: AddPlacementPort): Promise<void> {
    return this.placementRepository.addPlacementToPet(petPlacement);
  }

  deletePlacementFromPet(petPlacement: DeletePlacementPort): Promise<void> {
    return this.placementRepository.deletePlacementFromPet(petPlacement);
  }
}
