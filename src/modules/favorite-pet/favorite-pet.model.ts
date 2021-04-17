import { PetModel } from "../pets/domain/models/pet.model";

export interface FavoritePetModel {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly pet: PetModel;
}
