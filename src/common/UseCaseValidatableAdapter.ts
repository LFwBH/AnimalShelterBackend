import { ClassValidationDetails, ClassValidator } from "./ClassValidator";
import { Code } from "./Code";
import { Exception } from "./Exception";
import { Optional } from "./Optional";

export class UseCaseValidatableAdapter {
  async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(
      this,
    );
    if (details) {
      throw Exception.new({
        code: Code.USE_CASE_PORT_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
