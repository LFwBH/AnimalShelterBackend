import { IsNumber, IsOptional } from "class-validator";

import { ClassValidator } from "./ClassValidator";
import { Code } from "./Code";
import { Exception } from "./Exception";
import { ValidatorOptions } from "./ValidatorOptions";

export abstract class Entity {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  async validate(options?: ValidatorOptions): Promise<void> {
    const details = await ClassValidator.validate(this, options);

    if (details) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
