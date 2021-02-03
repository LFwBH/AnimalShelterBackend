import { plainToClass } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from "class-validator";

import { Pet } from "../../domain/entities/pet.entity";

class BreedDto {
  @IsNumber() id: number;
}

class ColorDto {
  @IsNumber() id: number;
}

class SexDto {
  @IsNumber() id: number;
}

export class CreatePetDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() description: string;
  @IsBoolean() special: boolean;
  @IsNumber() age: number;
  @ValidateNested() breed: BreedDto;
  @ValidateNested() color: ColorDto;
  @ValidateNested() sex: SexDto;

  static fromPet(pet: Pet) {
    return plainToClass(CreatePetDto, pet);
  }

  static toPet(dto: CreatePetDto) {
    return plainToClass(Pet, dto);
  }
}
