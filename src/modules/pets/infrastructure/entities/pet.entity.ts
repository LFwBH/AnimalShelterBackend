import {
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Entity } from "../../../../common/Entity";
import { Optional } from "../../../../common/Optional";
import { PetModel } from "../../domain/models/pet.model";

export interface CreatePetPayload {
  id: Optional<number>;
  name: string;
  age: number;
  description: string;
  special: boolean;
  color: string;
  kind: "Dog" | "Cat";
  sex: "Boy" | "Girl";
  createdAt: Optional<Date>;
  updatedAt: Optional<Date>;
}

export class PetEntity extends Entity<number> implements PetModel {
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

  @IsString()
  @IsNotEmpty()
  readonly color: string;

  @IsIn(["Boy", "Girl"])
  readonly sex: "Boy" | "Girl";

  @IsIn(["Dog", "Cat"])
  readonly kind: "Dog" | "Cat";

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
    this.kind = payload.kind;
    this.color = payload.color;
    this.sex = payload.sex;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  static async new(payload: CreatePetPayload): Promise<PetEntity> {
    const pet = new PetEntity(payload);
    await pet.validate();
    return pet;
  }
}
