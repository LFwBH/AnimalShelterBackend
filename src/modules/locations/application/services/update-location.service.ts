import { Inject, Injectable } from "@nestjs/common";

import { LocationModel } from "../../domain/models/location.model";
import { UpdateLocationPort } from "../../domain/ports/update-location.port";
import { LOCATION_REPOSITORY } from "../../domain/providers";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { UpdateLocationUseCase } from "../../domain/usecases/update-location.usecase";

@Injectable()
export class UpdateLocationService implements UpdateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
  ) {}

  execute(port: UpdateLocationPort): Promise<LocationModel> {
    return this.locationRepository.update(port);
  }
}
