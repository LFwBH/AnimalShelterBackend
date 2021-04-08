import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { Optional } from "common/Optional";

import { LostPetModel } from "./lost-pet.model";

export class CreateLostPetDto
  implements Partial<Omit<LostPetModel, "id" | "createdAt" | "updatedAt">> {
  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly archived: Optional<boolean>;

  @ApiPropertyOptional({ type: Date })
  @ValidateIf((o) => !!o.archived)
  @IsDate()
  @Transform(({ value, obj }) => (obj.archived ? new Date(value) : undefined))
  readonly archiveDate: Optional<Date>;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class UpdateLostPetDto
  implements Partial<Omit<LostPetModel, "id" | "createdAt" | "updatedAt">> {
  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly archived: Optional<boolean>;

  @ApiPropertyOptional({ type: Date })
  @ValidateIf((o) => !!o.archived)
  @IsDate()
  @Transform(({ value, obj }) => (obj.archived ? new Date(value) : undefined))
  readonly archiveDate: Optional<Date>;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly description: Optional<string>;
}
