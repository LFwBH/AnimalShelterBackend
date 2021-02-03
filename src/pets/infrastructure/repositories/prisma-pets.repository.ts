import { Nullable } from "../../../common/types";
import { Pet } from "../../domain/entities/pet.entity";
import { PetsRepository } from "../../domain/repositories/pets.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(pet: Pet): Promise<void> {
    void pet;
  }

  async findAll(): Promise<Iterable<Pet>> {
    return [];
  }

  async findOne(id: number): Promise<Nullable<Pet>> {
    void id;
    return null;
  }

  async remove(id: number): Promise<void> {
    void id;
  }

  async update(id: number, pet: Pet): Promise<void> {
    void id;
    void pet;
  }
}
