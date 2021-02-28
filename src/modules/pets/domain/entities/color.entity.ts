import { IsOptional, IsString } from "class-validator";

import { Entity } from "../../../../common/Entity";
import { Optional } from "../../../../common/Optional";

interface CreateColorPayload {
  id: Optional<number>;
  name: Optional<string>;
}

export interface IColor {
  readonly id: number;
  readonly name: string;
}

export class Color extends Entity<number> implements IColor {
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
