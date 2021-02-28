import { plainToClass } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { FindAllPetsPort } from "../../domain/ports/find-all-pets.port";

export class FindAllPetsAdapter
  extends UseCaseValidatableAdapter
  implements FindAllPetsPort {
  @IsNumber() @IsOptional() readonly cursor: Optional<number>;
  @IsNumber() @IsOptional() readonly take: Optional<number>;

  public static async new(
    payload: FindAllPetsPort,
  ): Promise<FindAllPetsAdapter> {
    const adapter = plainToClass(FindAllPetsAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
