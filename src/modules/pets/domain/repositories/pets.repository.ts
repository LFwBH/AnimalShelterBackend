import { Optional } from "../../../../common/Optional";
import { Pet } from "../entities/pet.entity";
import { RepositoryPageOptions } from "./repository-page.options";

export interface PetsRepository {
  create(pet: Pet): Promise<Pet>;

  findAll(page: Optional<RepositoryPageOptions>): Promise<Iterable<Pet>>;
}
