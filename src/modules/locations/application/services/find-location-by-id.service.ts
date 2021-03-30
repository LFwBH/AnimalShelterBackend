import { Inject, Injectable } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
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
    const location = this.locationRepository.findById(port);

    if (!location) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Location not found",
      });
    }

    return location;
  }
}
