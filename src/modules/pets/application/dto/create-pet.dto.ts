import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Optional } from "common/Optional";
import { CreatePetPort } from "modules/pets/domain/ports/create-pet.port";

export class CreatePetDto implements CreatePetPort {
  @ApiProperty()
  @IsString()
  readonly color: string;

  @ApiProperty()
  @IsIn(["Dog", "Cat"])
  readonly kind: "Dog" | "Cat";

  @ApiProperty()
  @IsIn(["Boy", "Girl"])
  readonly sex: "Boy" | "Girl";

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly special: boolean;

  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  readonly archiveDate: Optional<Date>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly archived: boolean;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly cameFrom: Optional<string>;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly dead: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly passport: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly reviewed: boolean;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  readonly sterilizationDate: Optional<Date>;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly sterilized: boolean;
}
