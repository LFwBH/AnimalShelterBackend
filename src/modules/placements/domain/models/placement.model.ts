import { PetPlacementModel } from "./pet-placement.model";

export interface PlacementModel {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly petPlacements: PetPlacementModel[];
}
