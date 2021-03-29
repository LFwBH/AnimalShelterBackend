import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

import { Optional } from "../../../../common/Optional";
import { CreateLocationPort } from "../../domain/ports/create-location.port";

export class CreateLocationDto implements CreateLocationPort {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiPropertyOptional({ type: String })
  @IsUrl()
  @IsOptional()
  readonly image: Optional<string>;
}
