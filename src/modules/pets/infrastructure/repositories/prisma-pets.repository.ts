import { Injectable } from "@nestjs/common";

import { Optional } from "../../../../common/Optional";
import { PrismaService } from "../../../../services/prisma.service";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { RepositoryPageOptions } from "../../domain/repositories/repository-page.options";
import { PetEntity } from "../entities/pet.entity";
import { PrismaPetsMapper } from "../mappers/prisma-pets.mapper";

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(pet: PetEntity): Promise<PetEntity> {
    const prismaPet = await PrismaPetsMapper.toPrismaPet(pet);
    const result = await this.prismaService.pet.create({ data: prismaPet });
    return PrismaPetsMapper.toEntityPet(result);
  }

  async findAll(
    page: Optional<RepositoryPageOptions>,
  ): Promise<Iterable<PetEntity>> {
    const pets = await this.prismaService.pet.findMany({
      ...(page.take != null
        ? {
            take: page.take,
            ...(page.cursor != null
              ? {
                  skip: 1,
                  cursor: { id_pet: page.cursor },
                }
              : {}),
          }
        : {}),
      orderBy: {
        created_at: "asc",
      },
    });
    return Promise.all(pets.map((p) => PrismaPetsMapper.toEntityPet(p)));
  }

  async findById(id: number): Promise<Optional<PetEntity>> {
    const pet = await this.prismaService.pet.findUnique({
      where: { id_pet: id },
    });
    return PrismaPetsMapper.toEntityPet(pet);
  }
}
