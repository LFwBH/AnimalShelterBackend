import { UseCase } from "../../../common/UseCase";
import { Pet } from "../entities/pet.entity";
import { FindAllPetsPort } from "../ports/find-all-pets.port";

export interface FindAllPetsUseCase
  extends UseCase<FindAllPetsPort, Iterable<Pet>> {}
