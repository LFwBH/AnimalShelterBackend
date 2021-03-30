import { Inject, Injectable } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
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

  async execute(port: UpdateLocationPort): Promise<LocationModel> {
    const locationExists = await this.locationRepository.findById(port.id);

    if (!locationExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "User not found",
      });
    }

    return this.locationRepository.update(port);
  }
}
