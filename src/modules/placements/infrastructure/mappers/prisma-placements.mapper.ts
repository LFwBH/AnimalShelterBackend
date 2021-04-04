import { Prisma } from "@prisma/client";

import { PlacementEntity } from "../entities/placement.entity";
import { PrismaPetPlacementMapper } from "./prisma-pet-placement.mapper";

type PrismaPlacement = Prisma.PlacementGetPayload<null>;

type PrismaPlacementWithPets = Prisma.PlacementGetPayload<{
  include: { pet_placements: true };
}>;

export const PrismaPlacementsMapper = {
  async toPrismaPlacement(
    placement: PlacementEntity,
  ): Promise<PrismaPlacement> {
    return {
      id_placement: placement.id,
      name: placement.name,
      created_at: placement.createdAt,
      updated_at: placement.updatedAt,
    };
  },

  async toPrismaPlacementWithPets(
    placement: PlacementEntity,
  ): Promise<PrismaPlacementWithPets> {
    const prismaPlacement = await this.toPrismaPlacement(placement);

    const prismaPetPlacements = await Promise.all(
      placement.petPlacements.map((placement) =>
        PrismaPetPlacementMapper.toPrismaPetPlacement(placement),
      ),
    );

    return {
      ...prismaPlacement,
      pet_placements: prismaPetPlacements,
    };
  },

  async toEntityPlacement(
    placement: PrismaPlacement,
  ): Promise<PlacementEntity> {
    return PlacementEntity.new({
      id: placement.id_placement,
      name: placement.name,
      createdAt: placement.created_at,
      updatedAt: placement.updated_at,
    });
  },

  async toEntityPlacementWithPets(
    placement: PrismaPlacementWithPets,
  ): Promise<PlacementEntity> {
    const placementEntity = await this.toEntityPlacement(placement);

    const petPlacementEntities = await Promise.all(
      placement.pet_placements.map((placement) =>
        PrismaPetPlacementMapper.toEntityPetPlacement(placement),
      ),
    );

    return PlacementEntity.new({
      ...placementEntity,
      petPlacements: petPlacementEntities,
    });
  },
};
