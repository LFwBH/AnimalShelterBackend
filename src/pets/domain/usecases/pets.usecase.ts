import { Nullable } from "../../../common/types";
import { Pet } from "../entities/pet.entity";

export interface PetsUseCase {
  create(pet: Pet): Promise<void>;

  findAll(): Promise<Iterable<Pet>>;

  findOne(id: number): Promise<Nullable<Pet>>;

  update(id: number, pet: Pet): Promise<void>;

  remove(id: number): Promise<void>;
}
