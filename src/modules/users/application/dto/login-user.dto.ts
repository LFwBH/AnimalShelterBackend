import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

import { FindUserByEmailPort } from "../../domain/ports/find-user-by-email.port";

export class LoginUserDto implements FindUserByEmailPort {
  @ApiProperty()
  @IsEmail()
  readonly email: string;
}
