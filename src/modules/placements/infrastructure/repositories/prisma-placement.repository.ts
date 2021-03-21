import { Injectable } from "@nestjs/common";
import { RepositoryPageOptions } from "common/RepositoryPageOptions";
import { PlacementRepository } from "modules/placements/domain/repositories/placement.repository";

import { Optional } from "../../../../common/Optional";
import { PrismaService } from "../../../../services/prisma.service";
import { CreatePetPlacementPort } from "../../domain/ports/create-pet-placement.port";
import { CreatePlacementPort } from "../../domain/ports/create-placement.port";
import { PlacementEntity } from "../entities/placement.entity";
import { PrismaPlacementsMapper } from "../mappers/prisma-placements.mapper";
import { Prisma } from ".prisma/client";

@Injectable()
export class PrismaPlacementRepository implements PlacementRepository {
  constructor(readonly prismaService: PrismaService) {}

  async addPlacementToPet(petPlacement: CreatePetPlacementPort): Promise<void> {
    await this.prismaService.petPlacement.create({
      data: {
        id_pet: petPlacement.petId,
        description: petPlacement.description,
        id_placement: petPlacement.placementId,
      },
    });
  }

  async findById(id: number): Promise<Optional<PlacementEntity>> {
    const findUniqueArgs: Prisma.SelectSubset<
      Prisma.PlacementFindUniqueArgs,
      Prisma.PlacementFindUniqueArgs
    > = {
      where: { id_placement: id },
    };

    const pet = await this.prismaService.placement.findUnique(findUniqueArgs);

    if (!pet) {
      return;
    }

    return PrismaPlacementsMapper.toEntityPlacement(pet);
  }

  async create(placement: CreatePlacementPort): Promise<PlacementEntity> {
    const placementEntity = await PlacementEntity.new(placement);

    const prismaPlacement = await PrismaPlacementsMapper.toPrismaPlacement(
      placementEntity,
    );

    const prismaCreatedPlacement = await this.prismaService.placement.create({
      data: prismaPlacement,
    });

    return PrismaPlacementsMapper.toEntityPlacement(prismaCreatedPlacement);
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
