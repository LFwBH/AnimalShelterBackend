import { plainToClass } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

import { Optional } from "../common/Optional";
import { RepositoryPageOptions } from "../common/RepositoryPageOptions";
import { UseCaseValidatableAdapter } from "../common/UseCaseValidatableAdapter";

export class PageOptionsAdapter
  extends UseCaseValidatableAdapter
  implements RepositoryPageOptions {
  @IsNumber()
  @IsOptional()
  readonly cursor: Optional<number>;

  @IsNumber()
  @IsOptional()
  readonly take: Optional<number>;

  static async new(
    payload: RepositoryPageOptions,
  ): Promise<PageOptionsAdapter> {
    const adapter = plainToClass(PageOptionsAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
