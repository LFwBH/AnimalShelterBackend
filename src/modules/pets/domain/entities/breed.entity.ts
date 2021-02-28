import { IsOptional, IsString } from "class-validator";

import { Entity } from "../../../../common/Entity";
import { Optional } from "../../../../common/Optional";

interface CreateBreedPayload {
  id: Optional<number>;
  name: Optional<string>;
}

export interface IBreed {
  readonly id: number;
  readonly name: string;
}

export class Breed extends Entity<number> implements IBreed {
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
