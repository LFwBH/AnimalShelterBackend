import { Optional } from "../../../../common/Optional";
import { UseCase } from "../../../../common/UseCase";
import { PetEntity } from "../../infrastructure/entities/pet.entity";

export interface FindPetByIdUseCase
  extends UseCase<number, Optional<PetEntity>> {}
