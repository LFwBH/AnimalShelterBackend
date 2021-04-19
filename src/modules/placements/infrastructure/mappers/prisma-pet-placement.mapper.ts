import { Prisma } from "@prisma/client";

import { PetPlacementModel } from "../../domain/models/pet-placement.model";
import { PetPlacementEntity } from "../entities/pet-placement.entity";

type PrismaPetPlacement = Prisma.PetPlacementGetPayload<null>;

export const PrismaPetPlacementMapper = {
  async toPrismaPetPlacement(
    petPlacement: PetPlacementModel,
  ): Promise<PrismaPetPlacement> {
    return {
      created_at: petPlacement.createdAt,
      description: petPlacement.description,
      id_pet_placement: petPlacement.id,
      id_pet: petPlacement.petId,
      id_placement: petPlacement.placementId,
      updated_at: petPlacement.updatedAt,
    };
  },

  async toEntityPetPlacement(
    petPlacement: PrismaPetPlacement,
  ): Promise<PetPlacementModel> {
    return PetPlacementEntity.new({
      createdAt: petPlacement.created_at,
      description: petPlacement.description,
      id: petPlacement.id_pet_placement,
      petId: petPlacement.id_pet,
      placementId: petPlacement.id_placement,
      updatedAt: petPlacement.updated_at,
    });
  },
};
