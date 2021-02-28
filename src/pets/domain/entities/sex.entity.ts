import { IsOptional, IsString } from "class-validator";

import { Entity } from "../../../common/Entity";
import { Optional } from "../../../common/Optional";

interface CreateSexPayload {
  id: Optional<number>;
  name: Optional<string>;
}

export interface ISex {
  readonly id: number;
  readonly name: string;
}

export class Sex extends Entity<number> implements ISex {
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
