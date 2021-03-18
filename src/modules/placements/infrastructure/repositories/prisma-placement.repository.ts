import { Injectable } from "@nestjs/common";
import { RepositoryPageOptions } from "common/RepositoryPageOptions";
import { PlacementModel } from "modules/placements/domain/models/placement.model";
import { PlacementRepository } from "modules/placements/domain/repositories/placement.repository";
import { PrismaService } from "services/prisma.service";

import { PlacementEntity } from "../entities/placement.entity";
import { PrismaPlacementsMapper } from "../mappers/prisma-placements.mapper";
import { Prisma } from ".prisma/client";

@Injectable()
export class PrismaPlacementRepository implements PlacementRepository {
  constructor(readonly prismaService: PrismaService) {}

  async create(placement: Partial<PlacementModel>): Promise<PlacementEntity> {
    const placementEntity = await PlacementEntity.new(placement);
    const prismaPlacement = await PrismaPlacementsMapper.toPrismaPlacement(
      placementEntity,
    );
    const result = await this.prismaService.placement.create({
      data: prismaPlacement,
    });
    return PrismaPlacementsMapper.toEntityPlacement(result);
  }

  async findAll(
    page: RepositoryPageOptions,
  ): Promise<Iterable<PlacementEntity>> {
    const findManyArgs: Prisma.PlacementFindManyArgs = {
      orderBy: { created_at: "asc" },
    };

    if (page.take != null) {
      findManyArgs.take = page.take;
    }

    if (page.cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_placement: page.cursor };
    }

    const placements = await this.prismaService.placement.findMany(
      findManyArgs,
    );

    return Promise.all(
      placements.map((o) => PrismaPlacementsMapper.toEntityPlacement(o)),
    );
  }
}
