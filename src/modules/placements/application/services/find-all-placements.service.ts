import { Inject, Injectable } from "@nestjs/common";

import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { PlacementModel } from "../../domain/models/placement.model";
import { PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PlacementRepository } from "../../domain/repositories/placement.repository";
import { FindAllPlacementsUseCase } from "../../domain/usecases/find-all-placements.usecase";

@Injectable()
export class FindAllPlacementsService implements FindAllPlacementsUseCase {
  constructor(
    @Inject(PLACEMENTS_REPOSITORY)
    private readonly placementRepository: PlacementRepository,
  ) {}

  execute(port: RepositoryPageOptions): Promise<Iterable<PlacementModel>> {
    return this.placementRepository.findAll(port);
  }
}
