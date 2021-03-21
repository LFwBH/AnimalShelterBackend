import { PetPlacementModel } from "../models/pet-placement.model";

export interface CreatePetPlacementPort
  extends Omit<PetPlacementModel, "id" | "createdAt" | "updatedAt"> {}
