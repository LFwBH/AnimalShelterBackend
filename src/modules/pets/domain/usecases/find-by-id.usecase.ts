import { Optional } from "../../../../common/Optional";
import { UseCase } from "../../../../common/UseCase";
import { Pet } from "../entities/pet.entity";

export interface FindPetByIdUseCase extends UseCase<number, Optional<Pet>> {}
