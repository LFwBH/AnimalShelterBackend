import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { IncomeModel } from "./income.model";

export class IncomeEntity implements IncomeModel {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @Expose()
  @ApiProperty()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  readonly updatedAt: Date;
}
