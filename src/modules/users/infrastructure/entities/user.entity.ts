import { Exclude, plainToClass } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { Entity } from "../../../../common/Entity";
import { UserModel } from "../../domain/models/user.model";

export class UserEntity extends Entity implements UserModel {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Exclude({ toPlainOnly: true })
  readonly password: string;

  @IsDate()
  @IsOptional()
  readonly createdAt: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Date;

  static async new(payload: Partial<UserModel>): Promise<UserEntity> {
    const placement = plainToClass(UserEntity, payload);
    await placement.validate();
    return placement;
  }
}
