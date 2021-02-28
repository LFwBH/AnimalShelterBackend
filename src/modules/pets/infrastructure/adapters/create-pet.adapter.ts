import { plainToClass } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../../common/UseCaseValidatableAdapter";
import { CreatePetPort } from "../../domain/ports/create-pet.port";

export class CreatePetAdapter
  extends UseCaseValidatableAdapter
  implements CreatePetPort {
  @IsNumber() readonly age: number;
  @IsNumber() readonly breedId: number;
  @IsNumber() readonly colorId: number;
  @IsString() readonly description: string;
  @IsString() readonly name: string;
  @IsNumber() readonly sexId: number;
  @IsBoolean() readonly special: boolean;

  public static async new(payload: CreatePetPort): Promise<CreatePetAdapter> {
    const adapter = plainToClass(CreatePetAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
