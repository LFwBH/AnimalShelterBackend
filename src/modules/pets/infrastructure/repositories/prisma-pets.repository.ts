import { Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { PrismaService } from "../../../../services/prisma.service";
import { CreatePetPort } from "../../domain/ports/create-pet.port";
import { PetFilterPort } from "../../domain/ports/pet-filter.port";
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
    page: Optional<RepositoryPageOptions & { filter: Optional<PetFilterPort> }>,
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

    if (page?.filter) {
      findManyArgs.where = {
        AND: (Object.keys(page.filter) as Array<keyof PetFilterPort>).reduce(
          (acc, key) => {
            const value = page.filter?.[key];

            if (typeof value === "string") {
              acc[key] = { contains: value };
            } else {
              acc[key] = value;
            }

            return acc;
          },
          {} as NonNullable<typeof findManyArgs.where>,
        ),
      };
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
