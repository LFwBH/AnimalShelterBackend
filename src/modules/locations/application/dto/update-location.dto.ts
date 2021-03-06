import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UpdateLocationPort } from "../../domain/ports/update-location.port";

export class UpdateLocationDto implements UpdateLocationPort {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly name: Optional<string>;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly description: Optional<string>;

  @ApiPropertyOptional({ type: String })
  @IsUrl()
  @IsOptional()
  readonly image: Optional<string>;
}
