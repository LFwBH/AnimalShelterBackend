import { Transform } from "class-transformer";
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
  @Transform(({ value }) => Number(value))
  readonly age: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  readonly special: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  readonly passport: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  readonly dead: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  readonly archived: boolean;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly archive_date: Optional<Date>;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  readonly reviewed: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  readonly sterilized: boolean;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
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
