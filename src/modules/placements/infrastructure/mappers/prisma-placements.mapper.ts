import { PlacementEntity } from "../entities/placement.entity";
import { Prisma } from ".prisma/client";

type PrismaPlacement = Prisma.PlacementGetPayload<null>;

export class PrismaPlacementsMapper {
  static async toPrismaPlacement(
    placement: PlacementEntity,
  ): Promise<PrismaPlacement> {
    return {
      id_placement: placement.id,
      name: placement.name,
      created_at: placement.createdAt,
      updated_at: placement.updatedAt,
    };
  }

  static async toEntityPlacement(
    placement: PrismaPlacement,
  ): Promise<PlacementEntity> {
    return PlacementEntity.new({
      id: placement.id_placement,
      name: placement.name,
      createdAt: placement.created_at,
      updatedAt: placement.updated_at,
    });
  }
}
