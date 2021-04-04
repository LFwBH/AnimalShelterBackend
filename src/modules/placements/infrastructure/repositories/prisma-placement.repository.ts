import { Injectable } from "@nestjs/common";
import { RepositoryPageOptions } from "common/RepositoryPageOptions";
import { PlacementRepository } from "modules/placements/domain/repositories/placement.repository";

import { Optional } from "../../../../common/Optional";
import { PrismaService } from "../../../../services/prisma.service";
import { CreatePetPlacementPort } from "../../domain/ports/create-pet-placement.port";
import { CreatePlacementPort } from "../../domain/ports/create-placement.port";
import { DeletePetPlacementPort } from "../../domain/ports/delete-pet-placement.port";
import { PlacementEntity } from "../entities/placement.entity";
import { PrismaPlacementsMapper } from "../mappers/prisma-placements.mapper";
import { Prisma } from ".prisma/client";

@Injectable()
export class PrismaPlacementRepository implements PlacementRepository {
  constructor(readonly prismaService: PrismaService) {}

  async findById(id: number): Promise<Optional<PlacementEntity>> {
    const findUniqueArgs: Prisma.SelectSubset<
      Prisma.PlacementFindUniqueArgs & { include: { pet_placements: true } },
      Prisma.PlacementFindUniqueArgs
    > = {
      where: { id_placement: id },
      include: { pet_placements: true },
    };

    const pet = await this.prismaService.placement.findUnique(findUniqueArgs);

    if (!pet) {
      return;
    }

    return PrismaPlacementsMapper.toEntityPlacementWithPets(pet);
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
    const findManyArgs: Prisma.SelectSubset<
      Prisma.PlacementFindManyArgs & { include: { pet_placements: true } },
      Prisma.PlacementFindManyArgs
    > = {
      orderBy: { created_at: "asc" },
      include: { pet_placements: true },
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
      placements.map((o) =>
        PrismaPlacementsMapper.toEntityPlacementWithPets(o),
      ),
    );
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.placement.delete({ where: { id_placement: id } });
  }

  async addPlacementToPet(petPlacement: CreatePetPlacementPort): Promise<void> {
    await this.prismaService.petPlacement.create({
      data: {
        id_pet: petPlacement.petId,
        description: petPlacement.description,
        id_placement: petPlacement.placementId,
      },
    });
  }

  async deletePlacementFromPet(
    petPlacement: DeletePetPlacementPort,
  ): Promise<void> {
    await this.prismaService.petPlacement.delete({
      where: {
        id_pet_id_placement: {
          id_pet: petPlacement.petId,
          id_placement: petPlacement.placementId,
        },
      },
    });
  }
}
