import { Prisma } from "@prisma/client";

import { LocationEntity } from "../entities/location.entity";

type PrismaLocation = Prisma.LocationGetPayload<null>;

export class PrismaLocationMapper {
  static async toPrismaLocation(
    location: LocationEntity,
  ): Promise<PrismaLocation> {
    return {
      id_location: location.id,
      name: location.name,
      description: location.description,
      created_at: location.createdAt,
      image: location.image ?? null,
      updated_at: location.updatedAt,
    };
  }

  static async toEntityLocation(
    location: PrismaLocation,
  ): Promise<LocationEntity> {
    return LocationEntity.new({
      id: location.id_location,
      name: location.name,
      description: location.description,
      image: location.image ?? undefined,
      createdAt: location.created_at,
      updatedAt: location.updated_at,
    });
  }
}
