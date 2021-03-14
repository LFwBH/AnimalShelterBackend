import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsNumber, IsString } from "class-validator";
import { PetModel } from "modules/pets/domain/models/pet.model";

export class CreatePetDto implements Partial<PetModel> {
  @ApiProperty() @IsString() color: string;
  @ApiProperty() @IsIn(["Dog", "Cat"]) kind: "Dog" | "Cat";
  @ApiProperty() @IsIn(["Boy", "Girl"]) sex: "Boy" | "Girl";
  @ApiProperty() @IsString() readonly name: string;
  @ApiProperty() @IsString() readonly description: string;
  @ApiProperty() @IsBoolean() readonly special: boolean;
  @ApiProperty() @IsNumber() readonly age: number;
}
