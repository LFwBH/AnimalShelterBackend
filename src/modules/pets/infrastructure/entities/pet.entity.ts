import { plainToClass } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Entity } from "../../../../common/Entity";
import { Optional } from "../../../../common/Optional";
import { PetModel } from "../../domain/models/pet.model";

export class PetEntity extends Entity<number> implements PetModel {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  @IsOptional()
  readonly special: boolean;

  @IsString()
  @IsNotEmpty()
  readonly color: string;

  @IsIn(["Boy", "Girl"])
  readonly sex: "Boy" | "Girl";

  @IsIn(["Dog", "Cat"])
  readonly kind: "Dog" | "Cat";

  @IsDate()
  @IsOptional()
  readonly createdAt: Optional<Date>;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Optional<Date>;

  @IsBoolean()
  @IsOptional()
  readonly passport: boolean;

  @IsBoolean()
  @IsOptional()
  readonly hasGone: boolean;

  @IsBoolean()
  @IsOptional()
  readonly archived: boolean;

  @IsDate()
  @IsOptional()
  readonly archiveDate: Optional<Date>;

  @IsOptional()
  @IsBoolean()
  readonly reviewed: boolean;

  @IsOptional()
  @IsBoolean()
  readonly sterilized: boolean;

  @IsOptional()
  @IsDate()
  readonly sterilizationDate: Optional<Date>;

  @IsOptional()
  @IsString()
  readonly cameFrom: string;

  static async new(payload: Partial<PetModel>): Promise<PetEntity> {
    const pet = plainToClass(PetEntity, payload);
    await pet.validate();
    return pet;
  }
}
