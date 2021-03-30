import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
  @ApiProperty()
  readonly token: string;
}
