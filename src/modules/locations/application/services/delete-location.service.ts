import { Inject, Injectable } from "@nestjs/common";

import { Code } from "../../../../common/Code";
import { Exception } from "../../../../common/Exception";
import { LOCATION_REPOSITORY } from "../../domain/providers";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { DeleteLocationUseCase } from "../../domain/usecases/delete-location.usecase";

@Injectable()
export class DeleteLocationService implements DeleteLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository,
  ) {}

  async execute(port: number): Promise<void> {
    const locationExists = await this.locationRepository.findById(port);

    if (!locationExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Location not found",
      });
    }

    await this.locationRepository.delete(port);
  }
}
