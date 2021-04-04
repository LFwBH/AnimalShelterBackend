import { Inject, Injectable } from "@nestjs/common";

import { PlacementModel } from "../../domain/models/placement.model";
import { CreatePlacementPort } from "../../domain/ports/create-placement.port";
import { PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PlacementRepository } from "../../domain/repositories/placement.repository";
import { CreatePlacementUseCase } from "../../domain/usecases/create-placement.usecase";

@Injectable()
export class CreatePlacementService implements CreatePlacementUseCase {
  constructor(
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepository,
  ) {}

  execute(port: CreatePlacementPort): Promise<PlacementModel> {
    return this.placementRepository.create(port);
  }
}
