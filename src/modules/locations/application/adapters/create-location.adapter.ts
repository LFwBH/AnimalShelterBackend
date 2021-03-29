import { plainToClass } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreateLocationPort } from "../../domain/ports/create-location.port";

export class CreateLocationAdapter
  extends UseCaseValidatableAdapter
  implements CreateLocationPort {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsUrl()
  @IsOptional()
  readonly image: Optional<string>;

  static async new(
    payload: CreateLocationPort,
  ): Promise<CreateLocationAdapter> {
    const adapter = plainToClass(CreateLocationAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
