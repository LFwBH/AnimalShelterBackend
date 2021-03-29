import { Inject, Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { LocationModel } from "../../domain/models/location.model";
import { LOCATION_REPOSITORY } from "../../domain/providers";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { FindLocationByIdUseCase } from "../../domain/usecases/find-location-by-id.usecase";

@Injectable()
export class FindLocationByIdService implements FindLocationByIdUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
  ) {}

  execute(port: number): Promise<Optional<LocationModel>> {
    return this.locationRepository.findById(port);
  }
}
