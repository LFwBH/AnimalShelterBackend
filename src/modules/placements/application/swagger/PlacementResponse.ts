import { ApiProperty } from "@nestjs/swagger";

import { PlacementModel } from "../../domain/models/placement.model";

export class PlacementResponse implements PlacementModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
