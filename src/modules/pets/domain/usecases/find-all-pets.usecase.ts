import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { Optional } from "../../../../common/Optional";
import { UseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";
import { PetFilterPort } from "../ports/pet-filter.port";

export interface FindAllPetsUseCase
  extends UseCase<
    RepositoryPageOptions & { filter: Optional<PetFilterPort> },
    Iterable<PetModel>
  > {}
