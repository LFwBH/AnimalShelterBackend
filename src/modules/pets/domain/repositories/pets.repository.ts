import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { Optional } from "../../../../common/Optional";
import { PetModel } from "../models/pet.model";
import { CreatePetPort } from "../ports/create-pet.port";
import { PetFilterPort } from "../ports/pet-filter.port";
import { UpdatePetPort } from "../ports/update-pet.port";

export interface PetsRepository {
  create(pet: CreatePetPort): Promise<PetModel>;

  update(pet: UpdatePetPort): Promise<PetModel>;

  findAll(
    page: Optional<RepositoryPageOptions & { filter: Optional<PetFilterPort> }>,
  ): Promise<Iterable<PetModel>>;

  findById(id: number): Promise<Optional<PetModel>>;
}
