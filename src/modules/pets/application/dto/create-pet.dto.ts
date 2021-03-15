import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Optional } from "common/Optional";
import { PetModel } from "modules/pets/domain/models/pet.model";

export class CreatePetDto
  implements Partial<Omit<PetModel, "sterilizationDate" | "archiveDate">> {
  @ApiProperty()
  @IsString()
  readonly color: string;

  @ApiProperty()
  @IsIn(["Dog", "Cat"])
  readonly kind: "Dog" | "Cat";

  @ApiProperty()
  @IsIn(["Boy", "Girl"])
  readonly sex: "Boy" | "Girl";

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly special: Optional<boolean>;

  @ApiProperty()
  @IsNumber()
  readonly age: number;

  @ApiPropertyOptional({ type: Date })
  @IsDateString()
  @IsOptional()
  readonly archiveDate: Optional<string>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly archived: Optional<boolean>;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly cameFrom: Optional<string>;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly hasGone: Optional<boolean>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly passport: Optional<boolean>;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  readonly reviewed: Optional<boolean>;

  @ApiPropertyOptional({ type: Date })
  @IsDateString()
  @IsOptional()
  readonly sterilizationDate: Optional<string>;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean()
  readonly sterilized: Optional<boolean>;
}
