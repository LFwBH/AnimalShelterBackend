import { Optional } from "../../../../common/Optional";
import { UseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";

export interface FindPetByIdUseCase
  extends UseCase<number, Optional<PetModel>> {}
