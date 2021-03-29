import { plainToClass } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

import { Entity } from "../../../../common/Entity";
import { Optional } from "../../../../common/Optional";
import { LocationModel } from "../../domain/models/location.model";

export class LocationEntity extends Entity implements LocationModel {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsUrl()
  @IsOptional()
  readonly image: Optional<string>;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

  static async new(payload: Partial<LocationModel>): Promise<LocationEntity> {
    const placement = plainToClass(LocationEntity, payload);
    await placement.validate();
    return placement;
  }
}
