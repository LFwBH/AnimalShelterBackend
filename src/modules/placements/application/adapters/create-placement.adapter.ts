import { plainToClass } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreatePlacementPort } from "../../domain/ports/create-placement.port";

export class CreatePlacementAdapter
  extends UseCaseValidatableAdapter
  implements CreatePlacementPort {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  static async new(
    payload: CreatePlacementPort,
  ): Promise<CreatePlacementAdapter> {
    const adapter = plainToClass(CreatePlacementAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
