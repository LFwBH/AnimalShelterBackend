import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { CreatePlacementPort } from "../../domain/ports/create-placement.port";

export class CreatePlacementDto implements CreatePlacementPort {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
