import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../../services/prisma.service";
import { Pet } from "../../domain/entities/pet.entity";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { PrismaPetsMapper } from "../mappers/prisma-pets.mapper";

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(pet: Pet): Promise<Pet> {
    const prismaPet = await PrismaPetsMapper.toPrismaPet(pet);
    const result = await this.prismaService.pet.create({
      data: prismaPet,
      include: {
        sex: true,
        breed: true,
        color: true,
      },
    });
    return PrismaPetsMapper.toEntityPet(result);
  }

  async findAll(): Promise<Iterable<Pet>> {
    const pets = await this.prismaService.pet.findMany({
      include: {
        sex: true,
        breed: true,
        color: true,
      },
    });
    return Promise.all(pets.map((p) => PrismaPetsMapper.toEntityPet(p)));
  }

  // async findOne(id: number): Promise<Nullable<Pet>> {}

  // async remove(id: number): Promise<Pet> {}

  // async update(id: number, pet: Pet): Promise<Pet> {}
}
