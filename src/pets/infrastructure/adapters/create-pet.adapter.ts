import { plainToClass } from "class-transformer";
import { IsBoolean, IsNumber, IsString } from "class-validator";

import { UseCaseValidatableAdapter } from "../../../common/UseCaseValidatableAdapter";
import { CreatePetPort } from "../../domain/ports/create-pet.port";

export class CreatePetAdapter
  extends UseCaseValidatableAdapter
  implements CreatePetPort {
  @IsNumber() age: number;
  @IsNumber() breedId: number;
  @IsNumber() colorId: number;
  @IsString() description: string;
  @IsString() name: string;
  @IsNumber() sexId: number;
  @IsBoolean() special: boolean;

  public static async new(payload: CreatePetPort): Promise<CreatePetAdapter> {
    const adapter = plainToClass(CreatePetAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
