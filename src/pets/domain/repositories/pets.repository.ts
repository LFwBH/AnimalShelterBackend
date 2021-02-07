import { Pet } from "../entities/pet.entity";

export interface PetsRepository {
  create(pet: Pet): Promise<Pet>;

  // findAll(): Promise<Iterable<Pet>>;

  // findOne(id: number): Promise<Nullable<Pet>>;

  // update(id: number, pet: Pet): Promise<Pet>;

  // remove(id: number): Promise<Pet>;
}
