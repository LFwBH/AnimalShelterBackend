import { ApiProperty } from "@nestjs/swagger";

import { IPet } from "../../domain/entities/pet.entity";
import { BreedResponse } from "./BreedResponse";
import { ColorResponse } from "./ColorResponse";
import { SexResponse } from "./SexResponse";

export class PetResponse implements IPet {
  @ApiProperty() readonly id: number;
  @ApiProperty() readonly age: number;
  @ApiProperty() readonly breed: BreedResponse;
  @ApiProperty() readonly color: ColorResponse;
  @ApiProperty() readonly createdAt: Date;
  @ApiProperty() readonly description: string;
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly sex: SexResponse;
  @ApiProperty() readonly special: boolean;
  @ApiProperty() readonly updatedAt: Date;
}
