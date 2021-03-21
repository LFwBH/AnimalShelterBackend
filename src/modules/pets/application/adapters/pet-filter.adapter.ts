import { plainToClass } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { PetFilterPort } from "../../domain/ports/pet-filter.port";

export class PetFilterAdapter
  extends UseCaseValidatableAdapter
  implements PetFilterPort {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @IsOptional()
  readonly age: number;

  @IsBoolean()
  @IsOptional()
  readonly special: boolean;

  @IsBoolean()
  @IsOptional()
  readonly passport: boolean;

  @IsBoolean()
  @IsOptional()
  readonly dead: boolean;

  @IsBoolean()
  @IsOptional()
  readonly archived: boolean;

  @IsOptional()
  @IsDate()
  readonly archive_date: Optional<Date>;

  @IsBoolean()
  @IsOptional()
  readonly reviewed: boolean;

  @IsBoolean()
  @IsOptional()
  readonly sterilized: boolean;

  @IsOptional()
  @IsDate()
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

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

  static async new(payload: PetFilterPort): Promise<PetFilterAdapter> {
    const adapter = plainToClass(PetFilterAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
