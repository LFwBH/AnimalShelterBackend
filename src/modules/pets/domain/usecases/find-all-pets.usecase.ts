import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { UseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";

export interface FindAllPetsUseCase
  extends UseCase<RepositoryPageOptions, Iterable<PetModel>> {}
