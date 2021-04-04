import { ApiProperty } from "@nestjs/swagger";

import { PetPlacementModel } from "../../domain/models/pet-placement.model";
import { PlacementModel } from "../../domain/models/placement.model";
import { PetPlacementResponse } from "./pet-placement.response";

export class PlacementResponse implements PlacementModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;

  @ApiProperty({ type: [PetPlacementResponse] })
  readonly petPlacements: PetPlacementModel[];
}
