import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";

import { CreatePlacementDto } from "./create-placement.dto";

export class UpdatePlacementDto extends PartialType(CreatePlacementDto) {
  @IsNumber()
  readonly id: number;
}
