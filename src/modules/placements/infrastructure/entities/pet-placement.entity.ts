import { plainToClass } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { Entity } from "../../../../common/Entity";
import { PetPlacementModel } from "../../domain/models/pet-placement.model";

export class PetPlacementEntity extends Entity implements PetPlacementModel {
  @IsInt()
  readonly petId: number;

  @IsInt()
  readonly placementId: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

  static async new(
    payload: Partial<PetPlacementModel>,
  ): Promise<PetPlacementEntity> {
    const placement = plainToClass(PetPlacementEntity, payload);
    await placement.validate();
    return placement;
  }
}
