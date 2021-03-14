import { plainToClass } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsString } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreatePetPort } from "../../domain/ports/create-pet.port";

export class CreatePetAdapter
  extends UseCaseValidatableAdapter
  implements CreatePetPort {
  @IsIn(["Dog", "Cat"]) readonly kind: "Dog" | "Cat";
  @IsString() readonly color: string;
  @IsIn(["Boy", "Girl"]) readonly sex: "Boy" | "Girl";
  @IsNumber() readonly age: number;
  @IsString() readonly description: string;
  @IsString() readonly name: string;
  @IsBoolean() readonly special: boolean;

  public static async new(payload: CreatePetPort): Promise<CreatePetAdapter> {
    const adapter = plainToClass(CreatePetAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
