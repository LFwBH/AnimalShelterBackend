import { Optional } from "../../../../common/Optional";
import { PetEntity } from "../../infrastructure/entities/pet.entity";
import { RepositoryPageOptions } from "./repository-page.options";

export interface PetsRepository {
  create(pet: PetEntity): Promise<PetEntity>;

  findAll(page: Optional<RepositoryPageOptions>): Promise<Iterable<PetEntity>>;

  findById(id: number): Promise<Optional<PetEntity>>;
}
