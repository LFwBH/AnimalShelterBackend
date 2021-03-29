import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { Optional } from "../../../../common/Optional";
import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { PrismaService } from "../../../../services/prisma.service";
import { LocationModel } from "../../domain/models/location.model";
import { CreateLocationPort } from "../../domain/ports/create-location.port";
import { UpdateLocationPort } from "../../domain/ports/update-location.port";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { LocationEntity } from "../entities/location.entity";
import { PrismaLocationMapper } from "../mappers/prisma-location.mapper";

@Injectable()
export class PrismaLocationRepository implements LocationRepository {
  constructor(readonly prismaService: PrismaService) {}

  async create(location: CreateLocationPort): Promise<LocationModel> {
    const locationEntity = await LocationEntity.new(location);

    const prismaLocation = await PrismaLocationMapper.toPrismaLocation(
      locationEntity,
    );

    const prismaCreatedLocation = await this.prismaService.location.create({
      data: prismaLocation,
    });

    return PrismaLocationMapper.toEntityLocation(prismaCreatedLocation);
  }

  async update(overrides: UpdateLocationPort): Promise<LocationModel> {
    const locationEntity = await LocationEntity.new(overrides);

    const prismaLocation = await PrismaLocationMapper.toPrismaLocation(
      locationEntity,
    );

    const prismaCreatedLocation = await this.prismaService.location.update({
      where: { id_location: overrides.id },
      data: prismaLocation,
    });

    return PrismaLocationMapper.toEntityLocation(prismaCreatedLocation);
  }

  async findAll(page: RepositoryPageOptions): Promise<Iterable<LocationModel>> {
    const findManyArgs: Prisma.LocationFindManyArgs = {
      orderBy: { created_at: "asc" },
    };

    if (page.take != null) {
      findManyArgs.take = page.take;
    }

    if (page.cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_location: page.cursor };
    }

    const locations = await this.prismaService.location.findMany(findManyArgs);

    return Promise.all(
      locations.map((o) => PrismaLocationMapper.toEntityLocation(o)),
    );
  }

  async findById(id: number): Promise<Optional<LocationModel>> {
    const findUniqueArgs: Prisma.SelectSubset<
      Prisma.LocationFindUniqueArgs,
      Prisma.LocationFindUniqueArgs
    > = {
      where: { id_location: id },
    };

    const location = await this.prismaService.location.findUnique(
      findUniqueArgs,
    );

    if (!location) {
      return;
    }

    return PrismaLocationMapper.toEntityLocation(location);
  }
}
