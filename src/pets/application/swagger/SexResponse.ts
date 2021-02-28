import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { ISex } from "../../domain/entities/sex.entity";

export class SexResponse implements ISex {
  @ApiProperty() readonly id: number;
  @ApiPropertyOptional() readonly name: string;
}
