import { Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { PrismaService } from "../../../../services/prisma.service";
import { CreatePetPort } from "../../domain/ports/create-pet.port";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { PetEntity } from "../entities/pet.entity";
import { PrismaPetsMapper } from "../mappers/prisma-pets.mapper";
import { Prisma } from ".prisma/client";

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(pet: CreatePetPort): Promise<PetEntity> {
    const petEntity = await PetEntity.new(pet);
    const prismaPet = await PrismaPetsMapper.toPrismaPet(petEntity);
    const result = await this.prismaService.pet.create({ data: prismaPet });
    return PrismaPetsMapper.toEntityPet(result);
  }

  async findAll(
    page: Optional<RepositoryPageOptions>,
  ): Promise<Iterable<PetEntity>> {
    const findManyArgs: Prisma.SelectSubset<
      Prisma.PetFindManyArgs & { include: { PetPlacement: true } },
      Prisma.PetFindManyArgs
    > = {
      orderBy: { created_at: "asc" },
      include: { PetPlacement: true },
    };

    if (page?.take != null) {
      findManyArgs.take = page.take;
    }

    if (page?.cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_pet: page.cursor };
    }

    const pets = await this.prismaService.pet.findMany(findManyArgs);

    return Promise.all(
      pets.map((p) => PrismaPetsMapper.toEntityPetWithPlacements(p)),
    );
  }

  async findById(id: number): Promise<Optional<PetEntity>> {
    const findUniqueArgs: Prisma.SelectSubset<
      Prisma.PetFindUniqueArgs & { include: { PetPlacement: true } },
      Prisma.PetFindUniqueArgs
    > = {
      where: { id_pet: id },
      include: { PetPlacement: true },
    };

    const pet = await this.prismaService.pet.findUnique(findUniqueArgs);

    if (!pet) {
      return;
    }

    return PrismaPetsMapper.toEntityPetWithPlacements(pet);
  }
}
