import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { Optional } from "../../../../common/Optional";
import { PetModel } from "../models/pet.model";
import { CreatePetPort } from "../ports/create-pet.port";

export interface PetsRepository {
  create(pet: CreatePetPort): Promise<PetModel>;

  findAll(page: Optional<RepositoryPageOptions>): Promise<Iterable<PetModel>>;

  findById(id: number): Promise<Optional<PetModel>>;
}
