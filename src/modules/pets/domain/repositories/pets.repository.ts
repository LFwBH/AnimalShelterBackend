import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { Optional } from "../../../../common/Optional";
import { PetModel } from "../models/pet.model";
export interface PetsRepository {
  create(pet: Partial<PetModel>): Promise<PetModel>;

  findAll(page: Optional<RepositoryPageOptions>): Promise<Iterable<PetModel>>;

  findById(id: number): Promise<Optional<PetModel>>;
}
