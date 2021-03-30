import { plainToClass } from "class-transformer";
import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { UpdateLocationPort } from "../../domain/ports/update-location.port";

export class UpdateLocationAdapter
  extends UseCaseValidatableAdapter
  implements UpdateLocationPort {
  @IsInt()
  readonly id: number;

  @IsString()
  @IsOptional()
  readonly name: Optional<string>;

  @IsString()
  @IsOptional()
  readonly description: Optional<string>;

  @IsUrl()
  @IsOptional()
  readonly image: Optional<string>;

  static async new(
    payload: UpdateLocationPort,
  ): Promise<UpdateLocationAdapter> {
    const adapter = plainToClass(UpdateLocationAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
