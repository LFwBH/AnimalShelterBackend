import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UpdatePetPort } from "../../domain/ports/update-pet.port";

export class UpdatePetDto implements UpdatePetPort {
  @IsInt()
  @IsOptional()
  readonly id: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly color: Optional<string>;

  @ApiPropertyOptional({ enum: ["Dog", "Cat"] })
  @IsOptional()
  @IsIn(["Dog", "Cat"])
  readonly kind: Optional<"Dog" | "Cat">;

  @ApiPropertyOptional({ enum: ["Boy", "Girl"] })
  @IsOptional()
  @IsIn(["Boy", "Girl"])
  readonly sex: Optional<"Boy" | "Girl">;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly name: Optional<string>;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly description: Optional<string>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly special: Optional<boolean>;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly age: Optional<number>;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  readonly archiveDate: Optional<Date>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly archived: Optional<boolean>;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly cameFrom: Optional<string>;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly dead: Optional<boolean>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly passport: Optional<boolean>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly reviewed: Optional<boolean>;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  readonly sterilizationDate: Optional<Date>;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly sterilized: Optional<boolean>;
}
