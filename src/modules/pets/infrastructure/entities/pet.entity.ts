import { plainToClass } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Entity } from "../../../../common/Entity";
import { Optional } from "../../../../common/Optional";
import { ValidatorOptions } from "../../../../common/ValidatorOptions";
import { PetPlacementEntity } from "../../../placements/infrastructure/entities/pet-placement.entity";
import { PetModel } from "../../domain/models/pet.model";

export class PetEntity extends Entity implements PetModel {
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
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

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

  @IsOptional()
  @ValidateNested()
  readonly placements: PetPlacementEntity[];

  static async new(
    payload: Partial<PetModel>,
    options?: ValidatorOptions,
  ): Promise<PetEntity> {
    const pet = plainToClass(PetEntity, payload);
    await pet.validate(options);
    return pet;
  }
}
