export interface PetPlacementModel {
  readonly id: number;
  readonly petId: number;
  readonly placementId: number;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
