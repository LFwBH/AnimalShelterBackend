import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

import { Code } from "../../common/Code";
import { CoreApiResponse } from "../../common/CoreApiResponse";
import { Exception } from "../../common/Exception";
import { User } from "../../common/UserDecorator";
import { PrismaService } from "../../services/prisma.service";
import { FindAllPetsResponse } from "../pets/application/swagger/find-all-pets.response";
import { PetModel } from "../pets/domain/models/pet.model";
import { PrismaPetsMapper } from "../pets/infrastructure/mappers/prisma-pets.mapper";
import { JwtAuthGuard } from "../users/application/guards/jwt-auth.guard";
import { FavoritePetMapper } from "./favorite-pet.mapper";
import { FavoritePetOkResponse } from "./favorite-pet.response";

@ApiTags("favorite_pet")
@Controller("favorite_pet")
export class FavoritePetController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly favoritePetMapper: FavoritePetMapper,
  ) {}

  @Post(":petId")
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: FavoritePetOkResponse })
  @ApiBearerAuth()
  async create(
    @Param("petId", ParseIntPipe) petId: number,
    @User() user: User,
  ): Promise<CoreApiResponse<PetModel>> {
    const petExists = await this.prismaService.pet.findFirst({
      where: { id_pet: petId },
    });

    if (!petExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet not found",
      });
    }

    await this.prismaService.favoritePet.create({
      data: {
        user_favorite_pets: {
          create: {
            id_user: user.id,
          },
        },
        pet: {
          connect: {
            id_pet: petId,
          },
        },
      },
    });

    return CoreApiResponse.success();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FindAllPetsResponse })
  @ApiBearerAuth()
  async findAll(
    @User() user: User,
    @Query("take") take?: string,
    @Query("cursor") cursor?: string,
    @Query("filter") filter?: Record<string, string>,
  ): Promise<CoreApiResponse<PetModel[]>> {
    const findManyArgs: Prisma.SelectSubset<
      Prisma.FavoritePetFindManyArgs & { include: { pet: true } },
      Prisma.FavoritePetFindManyArgs
    > = {
      orderBy: { created_at: "asc" },
      include: { pet: true },
      where: { user_favorite_pets: { every: { id_user: user.id } } },
    };

    if (take != null) {
      findManyArgs.take = Number(take);
    }

    if (cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_favorite_pet: Number(cursor) };
    }

    if (filter != null) {
      findManyArgs.where = {};

      if (filter.name) {
        findManyArgs.where.pet = {
          name: {
            contains: filter.name,
            mode: "insensitive",
          },
        };
      }
    }

    const foundFavoritePets = await this.prismaService.favoritePet.findMany(
      findManyArgs,
    );

    const favoritePets = await Promise.all(
      foundFavoritePets.map((favoritePet) =>
        this.favoritePetMapper.toEntity(favoritePet),
      ),
    );

    const petEntities = await Promise.all(
      favoritePets.map(async (favoritePet) => {
        const prismaPet = await PrismaPetsMapper.toPrismaPet(favoritePet.pet);
        return PrismaPetsMapper.toEntityPet(prismaPet);
      }),
    );

    return CoreApiResponse.success(petEntities);
  }

  @Delete(":favoritePetId")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FavoritePetOkResponse })
  @ApiBearerAuth()
  async delete(
    @Param("favoritePetId", ParseIntPipe) favoritePetId: number,
    @User() user: User,
  ): Promise<CoreApiResponse<void>> {
    const favoritePetExists = await this.prismaService.favoritePet.findFirst({
      where: {
        id_favorite_pet: favoritePetId,
        user_favorite_pets: { every: { id_user: user.id } },
      },
    });

    if (!favoritePetExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Favorite pet not found",
      });
    }

    await this.prismaService.$transaction([
      this.prismaService.userFavoritePet.delete({
        where: {
          id_favorite_pet_id_user: {
            id_user: user.id,
            id_favorite_pet: favoritePetId,
          },
        },
      }),

      this.prismaService.favoritePet.delete({
        where: { id_favorite_pet: favoritePetId },
      }),
    ]);

    return CoreApiResponse.success();
  }
}
