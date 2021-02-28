import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IColor } from "../../domain/entities/color.entity";

export class ColorResponse implements IColor {
  @ApiProperty() readonly id: number;
  @ApiPropertyOptional() readonly name: string;
}
