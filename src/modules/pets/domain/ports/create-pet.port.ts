import { PetModel } from "../models/pet.model";

type FieldsToOmit = "id" | "createdAt" | "updatedAt" | "placements";

export interface CreatePetPort extends Omit<PetModel, FieldsToOmit> {}
