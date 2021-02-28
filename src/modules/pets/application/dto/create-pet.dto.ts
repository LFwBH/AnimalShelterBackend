import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePetDto {
  @ApiProperty() @IsString() readonly name: string;
  @ApiProperty() @IsString() readonly description: string;
  @ApiProperty() @IsBoolean() readonly special: boolean;
  @ApiProperty() @IsNumber() readonly age: number;
  @ApiProperty() @IsNumber() readonly breedId: number;
  @ApiProperty() @IsNumber() readonly colorId: number;
  @ApiProperty() @IsNumber() readonly sexId: number;
}
