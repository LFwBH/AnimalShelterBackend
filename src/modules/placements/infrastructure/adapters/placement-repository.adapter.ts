import { Inject, Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { PlacementRepositoryPort } from "../../../pets/application/ports/placement-repository.port";
import { AddPlacementPort } from "../../../pets/domain/ports/add-placement.port";
import { PlacementModel } from "../../domain/models/placement.model";
import { PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PlacementRepository } from "../../domain/repositories/placement.repository";

@Injectable()
export class PlacementRepositoryAdapter implements PlacementRepositoryPort {
  constructor(
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepository,
  ) {}

  addPlacementToPet(petPlacement: AddPlacementPort): Promise<void> {
    return this.placementRepository.addPlacementToPet(petPlacement);
  }

  findById(id: number): Promise<Optional<PlacementModel>> {
    return this.placementRepository.findById(id);
  }
}
