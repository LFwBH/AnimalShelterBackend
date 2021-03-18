import { plainToClass } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Entity } from "../../../../common/Entity";
import { PlacementModel } from "../../domain/models/placement.model";

export class PlacementEntity extends Entity implements PlacementModel {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

  static async new(payload: Partial<PlacementModel>): Promise<PlacementEntity> {
    const placement = plainToClass(PlacementEntity, payload);
    await placement.validate();
    return placement;
  }
}
