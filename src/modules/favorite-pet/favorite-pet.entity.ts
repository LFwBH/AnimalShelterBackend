import { ApiProperty } from "@nestjs/swagger";

import { PetResponse } from "../pets/application/swagger/pet.response";
import { PetEntity } from "../pets/infrastructure/entities/pet.entity";
import { FavoritePetModel } from "./favorite-pet.model";

export class FavoritePetEntity implements FavoritePetModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;

  @ApiProperty({ type: PetResponse })
  readonly pet: PetEntity;
}
