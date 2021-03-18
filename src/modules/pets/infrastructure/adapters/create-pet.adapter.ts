import { plainToClass } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreatePetPort } from "../../domain/ports/create-pet.port";

export class CreatePetAdapter
  extends UseCaseValidatableAdapter
  implements CreatePetPort {
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
  readonly archiveDate: Date;

  @IsBoolean()
  @IsOptional()
  readonly reviewed: boolean;

  @IsBoolean()
  @IsOptional()
  readonly sterilized: boolean;

  @IsDate()
  @IsOptional()
  readonly sterilizationDate: Date;

  @IsString()
  @IsOptional()
  readonly cameFrom: string;

  @IsIn(["Dog", "Cat"])
  readonly kind: "Dog" | "Cat";

  @IsString()
  readonly color: string;

  @IsIn(["Boy", "Girl"])
  readonly sex: "Boy" | "Girl";

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly description: string;

  @IsString()
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly special: boolean;

  static async new(payload: CreatePetPort): Promise<CreatePetAdapter> {
    const adapter = plainToClass(CreatePetAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
