import { Inject, Injectable } from "@nestjs/common";

import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { LocationModel } from "../../domain/models/location.model";
import { LOCATION_REPOSITORY } from "../../domain/providers";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { FindAllLocationsUseCase } from "../../domain/usecases/find-all-locations.usecase";

@Injectable()
export class FindAllLocationsService implements FindAllLocationsUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
  ) {}

  execute(port: RepositoryPageOptions): Promise<Iterable<LocationModel>> {
    return this.locationRepository.findAll(port);
  }
}
