import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePetDto {
  @IsString() readonly name: string;
  @IsString() readonly description: string;
  @IsBoolean() readonly special: boolean;
  @IsNumber() readonly age: number;
  @IsNumber() readonly breedId: number;
  @IsNumber() readonly colorId: number;
  @IsNumber() readonly sexId: number;
}
