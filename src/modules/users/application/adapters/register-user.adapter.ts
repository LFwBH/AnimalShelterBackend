import { plainToClass } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreateUserPort } from "../../domain/ports/create-user.port";

export class RegisterUserAdapter
  extends UseCaseValidatableAdapter
  implements CreateUserPort {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  static async new(payload: CreateUserPort): Promise<RegisterUserAdapter> {
    const adapter = plainToClass(RegisterUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
