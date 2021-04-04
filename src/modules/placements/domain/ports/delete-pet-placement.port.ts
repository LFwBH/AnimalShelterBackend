import { PetPlacementModel } from "../models/pet-placement.model";

export interface DeletePetPlacementPort
  extends Pick<PetPlacementModel, "petId" | "placementId"> {}
