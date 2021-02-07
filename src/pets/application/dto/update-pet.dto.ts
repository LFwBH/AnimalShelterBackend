import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";

import { CreatePetDto } from "./create-pet.dto";

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @IsNumber() id: number;
}
