import {
  IsBoolean,
  IsDate,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Entity } from "../../../common/Entity";
import { Optional } from "../../../common/Optional";
import { Breed, IBreed } from "./breed.entity";
import { Color, IColor } from "./color.entity";
import { ISex, Sex } from "./sex.entity";

interface CreatePetPayload {
  id: Optional<number>;
  name: string;
  age: number;
  description: string;
  special: boolean;
  breed: Breed;
  color: Color;
  sex: Sex;
  createdAt: Optional<Date>;
  updatedAt: Optional<Date>;
}

export interface IPet {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly description: string;
  readonly special: boolean;
  readonly breed: IBreed;
  readonly color: IColor;
  readonly sex: ISex;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class Pet extends Entity<number> implements IPet {
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

  @IsDate()
  @IsOptional()
  readonly createdAt: Optional<Date>;

  @IsDate()
  @IsOptional()
  readonly updatedAt: Optional<Date>;

  constructor(payload: CreatePetPayload) {
    super({ id: payload.id });
    this.name = payload.name;
    this.age = payload.age;
    this.description = payload.description;
    this.special = payload.special;
    this.breed = payload.breed;
    this.color = payload.color;
    this.sex = payload.sex;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  static async new(payload: CreatePetPayload): Promise<Pet> {
    const pet = new Pet(payload);
    await pet.validate();
    return pet;
  }
}
