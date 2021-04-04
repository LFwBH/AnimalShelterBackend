import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { IncomeModel } from "./income.model";

export class IncomeDto
  implements Omit<IncomeModel, "id" | "fullName" | "createdAt" | "updatedAt"> {
  @ApiProperty({ type: Date })
  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @ApiProperty()
  @IsNumber()
  readonly amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
