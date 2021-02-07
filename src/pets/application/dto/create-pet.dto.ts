import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePetDto {
  @IsString() name: string;
  @IsString() description: string;
  @IsBoolean() special: boolean;
  @IsNumber() age: number;
  @IsNumber() breedId: number;
  @IsNumber() colorId: number;
  @IsNumber() sexId: number;
}
