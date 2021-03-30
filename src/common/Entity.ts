import { IsNumber, IsOptional } from "class-validator";

import { ClassValidationDetails, ClassValidator } from "./ClassValidator";
import { Code } from "./Code";
import { Exception } from "./Exception";
import { Optional } from "./Optional";

export abstract class Entity {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(
      this,
    );
    if (details) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
