import {
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { Entity } from "../../../common/Entity";
import { Optional } from "../../../common/Optional";

interface CreateBreedPayload {
  id: Optional<number>;
  name: Optional<string>;
}

export class Breed extends Entity<number> {
  @IsString()
  @IsOptional()
  readonly name: Optional<string>;

  constructor(payload: CreateBreedPayload) {
    super({ id: payload.id });
    this.name = payload.name;
  }

  static async new(payload: CreateBreedPayload): Promise<Breed> {
    const breed = new Breed(payload);
    await breed.validate();
    return breed;
  }
}

interface CreateColorPayload {
  id: Optional<number>;
  name: Optional<string>;
}

export class Color extends Entity<number> {
  @IsString()
  @IsOptional()
  readonly name: Optional<string>;

  constructor(payload: CreateColorPayload) {
    super({ id: payload.id });
    this.name = payload.name;
  }

  static async new(payload: CreateColorPayload): Promise<Color> {
    const color = new Color(payload);
    await color.validate();
    return color;
  }
}

interface CreateSexPayload {
  id: Optional<number>;
  name: Optional<string>;
}

export class Sex extends Entity<number> {
  @IsString()
  @IsOptional()
  readonly name: Optional<string>;

  constructor(payload: CreateSexPayload) {
    super({ id: payload.id });

    this.name = payload.name;
  }

  static async new(payload: CreateSexPayload): Promise<Sex> {
    const sex = new Sex(payload);
    await sex.validate();
    return sex;
  }
}

interface CreatePetPayload {
  id: Optional<number>;
  name: string;
  age: number;
  description: string;
  special: boolean;
  breed: Breed;
  color: Color;
  sex: Sex;
}

export class Pet extends Entity<number> {
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

  constructor(payload: CreatePetPayload) {
    super({ id: payload.id });
    this.name = payload.name;
    this.age = payload.age;
    this.description = payload.description;
    this.special = payload.special;
    this.breed = payload.breed;
    this.color = payload.color;
    this.sex = payload.sex;
  }

  static async new(payload: CreatePetPayload): Promise<Pet> {
    const pet = new Pet(payload);
    await pet.validate();
    return pet;
  }
}
