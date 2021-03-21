import { ApiProperty } from "@nestjs/swagger";

import { PetPlacementModel } from "../../domain/models/pet-placement.model";

export class PetPlacementResponse implements PetPlacementModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly petId: number;

  @ApiProperty()
  readonly placementId: number;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
