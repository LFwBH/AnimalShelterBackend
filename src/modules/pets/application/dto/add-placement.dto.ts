import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

import { AddPlacementPort } from "../../domain/ports/add-placement.port";

export class AddPlacementDto implements AddPlacementPort {
  @ApiProperty()
  @IsInt()
  readonly petId: number;

  @ApiProperty()
  @IsInt()
  readonly placementId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
