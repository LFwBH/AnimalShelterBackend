import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { Optional } from "../../../../common/Optional";
import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { PrismaService } from "../../../../services/prisma.service";
import { UserModel } from "../../domain/models/user.model";
import { CreateUserPort } from "../../domain/ports/create-user.port";
import { FindUserByEmailPort } from "../../domain/ports/find-user-by-email.port";
import { UpdateUserPort } from "../../domain/ports/update-user.port";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../entities/user.entity";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async update(overrides: UpdateUserPort): Promise<UserModel> {
    const userEntity = await UserEntity.new(overrides);

    const prismaUser = await PrismaUserMapper.toPrismaUser(userEntity);

    const prismaUpdatedUser = await this.prismaService.user.update({
      where: { id_user: overrides.id },
      data: prismaUser,
    });

    return PrismaUserMapper.toEntityUser(prismaUpdatedUser);
  }

  async findByEmail(user: FindUserByEmailPort): Promise<Optional<UserModel>> {
    const findUniqueArgs: Prisma.SelectSubset<
      Prisma.UserFindUniqueArgs,
      Prisma.UserFindUniqueArgs
    > = {
      where: { email: user.email },
    };

    const location = await this.prismaService.user.findUnique(findUniqueArgs);

    if (!location) {
      return;
    }

    return PrismaUserMapper.toEntityUser(location);
  }

  async findAll(page: RepositoryPageOptions): Promise<Iterable<UserModel>> {
    const findManyArgs: Prisma.UserFindManyArgs = {
      orderBy: { created_at: "asc" },
    };

    if (page.take != null) {
      findManyArgs.take = page.take;
    }

    if (page.cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_user: page.cursor };
    }

    const locations = await this.prismaService.user.findMany(findManyArgs);

    return Promise.all(locations.map((o) => PrismaUserMapper.toEntityUser(o)));
  }

  async create(user: CreateUserPort): Promise<UserModel> {
    const userEntity = await UserEntity.new(user);

    const prismaUser = await PrismaUserMapper.toPrismaUser(userEntity);

    const prismaCreatedUser = await this.prismaService.user.create({
      data: prismaUser,
    });

    return PrismaUserMapper.toEntityUser(prismaCreatedUser);
  }
}
