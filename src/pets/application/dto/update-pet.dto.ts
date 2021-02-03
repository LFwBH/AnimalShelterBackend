import { PartialType } from "@nestjs/mapped-types";
import { plainToClass } from "class-transformer";
import { IsNumber } from "class-validator";

import { Pet } from "../../domain/entities/pet.entity";
import { CreatePetDto } from "./create-pet.dto";

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsNumber() id: number;

  static fromPet(pet: Pet) {
    return plainToClass(UpdatePetDto, pet);
  }

  static toPet(dto: UpdatePetDto) {
    return plainToClass(Pet, dto);
  }
}
