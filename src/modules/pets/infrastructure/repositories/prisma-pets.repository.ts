import { Injectable } from "@nestjs/common";
import { RepositoryPageOptions } from "common/RepositoryPageOptions";
import { PetModel } from "modules/pets/domain/models/pet.model";

import { Optional } from "../../../../common/Optional";
import { PrismaService } from "../../../../services/prisma.service";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { PetEntity } from "../entities/pet.entity";
import { PrismaPetsMapper } from "../mappers/prisma-pets.mapper";
import { Prisma } from ".prisma/client";

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(pet: Partial<PetModel>): Promise<PetEntity> {
    const petEntity = await PetEntity.new(pet);
    const prismaPet = await PrismaPetsMapper.toPrismaPet(petEntity);
    const result = await this.prismaService.pet.create({ data: prismaPet });
    return PrismaPetsMapper.toEntityPet(result);
  }

  async findAll(
    page: Optional<RepositoryPageOptions>,
  ): Promise<Iterable<PetEntity>> {
    const findManyArgs: Prisma.PetFindManyArgs = {
      orderBy: { created_at: "asc" },
    };

    if (page?.take != null) {
      findManyArgs.take = page.take;
    }

    if (page?.cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_pet: page.cursor };
    }

    const pets = await this.prismaService.pet.findMany(findManyArgs);

    return Promise.all(pets.map((p) => PrismaPetsMapper.toEntityPet(p)));
  }

  async findById(id: number): Promise<Optional<PetEntity>> {
    const findUniqueArgs: Prisma.PetFindUniqueArgs = {
      where: { id_pet: id },
    };

    const pet = await this.prismaService.pet.findUnique(findUniqueArgs);

    if (!pet) {
      return;
    }

    return PrismaPetsMapper.toEntityPet(pet);
  }
}
