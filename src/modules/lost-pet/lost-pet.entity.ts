import { ApiProperty } from "@nestjs/swagger";

import { LostPetModel } from "./lost-pet.model";

export class LostPetEntity implements LostPetModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly archived: boolean;

  @ApiProperty({ type: Date })
  readonly archiveDate: Date;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
