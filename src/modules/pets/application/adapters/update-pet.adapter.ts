import { plainToClass, Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

import { Optional } from "../../../../common/Optional";
import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { UpdatePetPort } from "../../domain/ports/update-pet.port";

export class UpdatePetAdapter
  extends UseCaseValidatableAdapter
  implements UpdatePetPort {
  @IsInt()
  readonly id: number;

  @IsBoolean()
  @IsOptional()
  readonly passport: Optional<boolean>;

  @IsBoolean()
  @IsOptional()
  readonly dead: Optional<boolean>;

  @IsBoolean()
  @IsOptional()
  readonly archived: Optional<boolean>;

  @ValidateIf((o: UpdatePetAdapter) => !!o.archived)
  @Transform(({ value, obj }) => (!obj.archived ? undefined : value))
  @IsDate()
  readonly archiveDate: Optional<Date>;

  @IsBoolean()
  @IsOptional()
  readonly reviewed: Optional<boolean>;

  @IsBoolean()
  @IsOptional()
  readonly sterilized: Optional<boolean>;

  @ValidateIf((o: UpdatePetAdapter) => !!o.sterilized)
  @Transform(({ value, obj }) => (!obj.sterilized ? undefined : value))
  @IsDate()
  readonly sterilizationDate: Optional<Date>;

  @IsString()
  @IsOptional()
  readonly cameFrom: Optional<string>;

  @IsIn(["Dog", "Cat"])
  @IsOptional()
  readonly kind: Optional<"Dog" | "Cat">;

  @IsString()
  @IsOptional()
  readonly color: Optional<string>;

  @IsIn(["Boy", "Girl"])
  @IsOptional()
  readonly sex: Optional<"Boy" | "Girl">;

  @IsNumber()
  @IsOptional()
  readonly age: Optional<number>;

  @IsString()
  @IsOptional()
  readonly description: Optional<string>;

  @IsString()
  @IsOptional()
  readonly name: Optional<string>;

  @IsBoolean()
  @IsOptional()
  readonly special: Optional<boolean>;

  static async new(payload: UpdatePetPort): Promise<UpdatePetAdapter> {
    const adapter = plainToClass(UpdatePetAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
