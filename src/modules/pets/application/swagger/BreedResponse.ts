import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IBreed } from "../../domain/entities/breed.entity";

export class BreedResponse implements IBreed {
  @ApiProperty() readonly id: number;
  @ApiPropertyOptional() readonly name: string;
}
