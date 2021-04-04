import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Optional } from "../../../../common/Optional";
import { PetFilterPort } from "../../domain/ports/pet-filter.port";

export class PetFilterDto implements PetFilterPort {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly age: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly special: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly passport: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly dead: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly archived: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly archive_date: Optional<Date>;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly reviewed: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly sterilized: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly sterilization_date: Optional<Date>;

  @IsString()
  @IsOptional()
  readonly color: string;

  @IsOptional()
  @IsIn(["Dog", "Cat"])
  readonly kind: "Dog" | "Cat";

  @IsOptional()
  @IsIn(["Boy", "Girl"])
  readonly sex: "Boy" | "Girl";
}
