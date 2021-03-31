import { PetModel } from "../models/pet.model";

export interface UpdatePetPort
  extends Partial<Omit<PetModel, "createdAt" | "updatedAt" | "placements">> {
  readonly id: number;
}
