import { plainToClass } from "class-transformer";
import { IsEmail } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { FindUserByEmailPort } from "../../domain/ports/find-user-by-email.port";

export class LoginUserAdapter
  extends UseCaseValidatableAdapter
  implements FindUserByEmailPort {
  @IsEmail()
  readonly email: string;

  static async new(payload: FindUserByEmailPort): Promise<LoginUserAdapter> {
    const adapter = plainToClass(LoginUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
