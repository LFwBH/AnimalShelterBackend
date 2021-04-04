import { plainToClass } from "class-transformer";
import { IsInt } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { DeletePetPlacementPort } from "../../domain/ports/delete-pet-placement.port";

export class DeletePetPlacementAdapter
  extends UseCaseValidatableAdapter
  implements DeletePetPlacementPort {
  @IsInt()
  readonly petId: number;

  @IsInt()
  readonly placementId: number;

  static async new(
    payload: DeletePetPlacementPort,
  ): Promise<DeletePetPlacementAdapter> {
    const adapter = plainToClass(DeletePetPlacementAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
