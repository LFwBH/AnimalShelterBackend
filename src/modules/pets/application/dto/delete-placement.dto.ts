import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

import { DeletePlacementPort } from "../../domain/ports/delete-placement.port";

export class DeletePlacementDto implements DeletePlacementPort {
  @ApiProperty()
  @IsInt()
  readonly petId: number;

  @ApiProperty()
  @IsInt()
  readonly placementId: number;
}
