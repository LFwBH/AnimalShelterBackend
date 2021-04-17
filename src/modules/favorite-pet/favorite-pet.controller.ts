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
import { JwtAuthGuard } from "../users/application/guards/jwt-auth.guard";
import { FavoritePetMapper } from "./favorite-pet.mapper";
import { FavoritePetModel } from "./favorite-pet.model";
import {
  FavoritePetArrayResponse,
  FavoritePetOkResponse,
  FavoritePetResponse,
} from "./favorite-pet.response";

@ApiTags("favorite_pet")
@Controller("favorite_pet")
export class FavoritePetController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly favoritePetMapper: FavoritePetMapper,
  ) {}

  @Post(":petId")
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: FavoritePetResponse })
  @ApiBearerAuth()
  async create(
    @Param("petId", ParseIntPipe) petId: number,
    @User() user: User,
  ): Promise<CoreApiResponse<FavoritePetModel>> {
    const petExists = await this.prismaService.pet.findFirst({
      where: { id_pet: petId },
    });

    if (!petExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Pet not found",
      });
    }

    const createdFavoritePet = await this.prismaService.favoritePet.create({
      include: {
        pet: true,
      },
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

    return CoreApiResponse.success(
      await this.favoritePetMapper.toEntity(createdFavoritePet),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FavoritePetArrayResponse })
  @ApiBearerAuth()
  async findAll(
    @User() user: User,
    @Query("take") take?: string,
    @Query("cursor") cursor?: string,
  ): Promise<CoreApiResponse<FavoritePetModel[]>> {
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

    const foundFavoritePets = await this.prismaService.favoritePet.findMany(
      findManyArgs,
    );

    return CoreApiResponse.success(
      await Promise.all(
        foundFavoritePets.map((favoritePet) =>
          this.favoritePetMapper.toEntity(favoritePet),
        ),
      ),
    );
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
