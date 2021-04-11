import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { CoreApiResponse } from "common/CoreApiResponse";
import { User } from "common/UserDecorator";
import { JwtAuthGuard } from "modules/users/application/guards/jwt-auth.guard";
import { PrismaService } from "services/prisma.service";

import { Code } from "../../common/Code";
import { Exception } from "../../common/Exception";
import { CreateLostPetDto, UpdateLostPetDto } from "./lost-pet.dto";
import { LostPetMapper } from "./lost-pet.mapper";
import { LostPetModel } from "./lost-pet.model";
import { LostPetArrayResponse, LostPetResponse } from "./lost-pet.response";

@ApiTags("lost_pet")
@Controller("lost_pet")
export class LostPetController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly lostPetMapper: LostPetMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: LostPetResponse })
  @ApiBearerAuth()
  async create(
    @Body() body: CreateLostPetDto,
    @User() user: User,
  ): Promise<CoreApiResponse<LostPetModel>> {
    const createdLostPet = await this.prismaService.lostPet.create({
      data: {
        description: body.description,
        archived: body.archived,
        archive_date: body.archiveDate,
        user_lost_pets: {
          create: {
            id_user: user.id,
          },
        },
      },
    });

    return CoreApiResponse.success(this.lostPetMapper.toEntity(createdLostPet));
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: LostPetResponse })
  @ApiBearerAuth()
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateLostPetDto,
  ): Promise<CoreApiResponse<LostPetModel>> {
    const lostPetExists = await this.prismaService.lostPet.findUnique({
      where: { id_lost_pet: id },
    });

    if (!lostPetExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Lost pet not found",
      });
    }

    const updatedLostPet = await this.prismaService.lostPet.update({
      where: { id_lost_pet: id },
      data: {
        description: body.description,
        archived: body.archived,
        archive_date: body.archiveDate,
      },
    });

    return CoreApiResponse.success(this.lostPetMapper.toEntity(updatedLostPet));
  }

  @Get(":id")
  @ApiOkResponse({ type: LostPetResponse })
  async findById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<LostPetModel>> {
    const lostPet = await this.prismaService.lostPet.findUnique({
      where: { id_lost_pet: id },
    });

    if (!lostPet) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Lost pet not found",
      });
    }

    return CoreApiResponse.success(this.lostPetMapper.toEntity(lostPet));
  }

  @Get()
  @ApiOkResponse({ type: LostPetArrayResponse })
  async findAll(
    @Query("take") take?: string,
    @Query("cursor") cursor?: string,
    @Query("filter") filter?: Record<string, string>,
  ): Promise<CoreApiResponse<LostPetModel[]>> {
    const findManyArgs: Prisma.LostPetFindManyArgs = {
      orderBy: { created_at: "asc" },
    };

    if (take != null) {
      findManyArgs.take = Number(take);
    }

    if (cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_lost_pet: Number(cursor) };
    }

    if (filter != null) {
      findManyArgs.where = {};

      if (filter.description) {
        findManyArgs.where.description = {
          contains: filter.description,
          mode: "insensitive",
        };
      }

      if (filter.archived) {
        findManyArgs.where.archived = filter.archived === "true";
      }
    }

    const foundLostPets = await this.prismaService.lostPet.findMany(
      findManyArgs,
    );

    return CoreApiResponse.success(
      foundLostPets.map((lostPet) => this.lostPetMapper.toEntity(lostPet)),
    );
  }
}
