import {
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Optional } from "../../../common/types";

class Breed {
  @IsOptional()
  @IsNumber()
  readonly id: Optional<number>;

  @IsString()
  readonly name: string;
}

class Color {
  @IsOptional()
  @IsNumber()
  readonly id: Optional<number>;

  @IsString()
  readonly name: string;
}

class Sex {
  @IsNumber()
  @IsOptional()
  readonly id: Optional<number>;

  @IsString()
  readonly name: string;
}

export class Pet {
  @IsNumber()
  @IsOptional()
  readonly id: Optional<number>;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  readonly special: boolean;

  @IsInstance(Breed)
  @ValidateNested()
  readonly breed: Breed;

  @IsInstance(Color)
  @ValidateNested()
  readonly color: Color;

  @IsInstance(Sex)
  @ValidateNested()
  readonly sex: Sex;
}
