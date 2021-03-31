import { PetModel } from "../models/pet.model";

export interface CreatePetPort
  extends Omit<PetModel, "id" | "createdAt" | "updatedAt" | "placements"> {}
