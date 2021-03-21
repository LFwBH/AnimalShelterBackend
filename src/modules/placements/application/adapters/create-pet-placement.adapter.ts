import { plainToClass } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreatePetPlacementPort } from "../../domain/ports/create-pet-placement.port";

export class CreatePetPlacementAdapter
  extends UseCaseValidatableAdapter
  implements CreatePetPlacementPort {
  @IsInt()
  readonly petId: number;

  @IsInt()
  readonly placementId: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  static async new(
    payload: CreatePetPlacementPort,
  ): Promise<CreatePetPlacementAdapter> {
    const adapter = plainToClass(CreatePetPlacementAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
