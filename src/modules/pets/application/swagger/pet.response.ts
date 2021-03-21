import { ApiProperty } from "@nestjs/swagger";

import { PetPlacementResponse } from "../../../placements/application/swagger/pet-placement.response";
import { PetModel } from "../../domain/models/pet.model";

export class PetResponse implements PetModel {
  @ApiProperty()
  readonly passport: boolean;

  @ApiProperty()
  readonly dead: boolean;

  @ApiProperty()
  readonly archived: boolean;

  @ApiProperty({ type: Date })
  readonly archiveDate: Date;

  @ApiProperty()
  readonly reviewed: boolean;

  @ApiProperty()
  readonly sterilized: boolean;

  @ApiProperty({ type: Date })
  readonly sterilizationDate: Date;

  @ApiProperty()
  readonly cameFrom: string;

  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly age: number;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;

  @ApiProperty({ enum: ["Dog", "Cat"] })
  readonly kind: "Dog" | "Cat";

  @ApiProperty({ enum: ["Boy", "Girl"] })
  readonly sex: "Boy" | "Girl";

  @ApiProperty()
  readonly special: boolean;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;

  @ApiProperty({ type: [PetPlacementResponse] })
  readonly placements: PetPlacementResponse[];
}
