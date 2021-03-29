import { Inject, Injectable } from "@nestjs/common";

import { LocationModel } from "../../domain/models/location.model";
import { CreateLocationPort } from "../../domain/ports/create-location.port";
import { LOCATION_REPOSITORY } from "../../domain/providers";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { CreateLocationUseCase } from "../../domain/usecases/create-location.usecase";

@Injectable()
export class CreateLocationService implements CreateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
  ) {}

  execute(port: CreateLocationPort): Promise<LocationModel> {
    return this.locationRepository.create(port);
  }
}
