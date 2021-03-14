import { ApiProperty } from "@nestjs/swagger";

import { PetModel } from "../../domain/models/pet.model";

export class PetResponse implements PetModel {
  @ApiProperty() readonly id: number;
  @ApiProperty() readonly age: number;
  @ApiProperty() readonly createdAt: Date;
  @ApiProperty() readonly description: string;
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly color: string;
  @ApiProperty({ enum: ["Dog", "Cat"] }) readonly kind: "Dog" | "Cat";
  @ApiProperty({ enum: ["Boy", "Girl"] }) readonly sex: "Boy" | "Girl";
  @ApiProperty() readonly special: boolean;
  @ApiProperty() readonly updatedAt: Date;
}
