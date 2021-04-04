import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Income as PrismaIncome, Prisma } from "@prisma/client";

import { Code } from "../../common/Code";
import { CoreApiResponse } from "../../common/CoreApiResponse";
import { Exception } from "../../common/Exception";
import { PrismaService } from "../../services/prisma.service";
import { IncomeDto } from "./income.dto";
import { IncomeMapper } from "./income.mapper";
import { IncomeModel } from "./income.model";
import {
  IncomeArrayResponse,
  IncomeOkResponse,
  IncomeResponse,
} from "./income.response";

@ApiTags("income")
@Controller("income")
export class IncomeController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly incomeMapper: IncomeMapper,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: IncomeResponse })
  async create(@Body() body: IncomeDto): Promise<CoreApiResponse<IncomeModel>> {
    const createdIncome = await this.prismaService.income.create({
      data: {
        amount: body.amount,
        first_name: body.firstName,
        last_name: body.lastName,
      },
    });

    return CoreApiResponse.success(
      this.incomeMapper.toIncomeModel(createdIncome),
    );
  }

  @Delete(":id")
  @ApiOkResponse({ type: IncomeOkResponse })
  async delete(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<null>> {
    let incomeExists: PrismaIncome | null = null;

    try {
      [incomeExists] = await this.prismaService.$transaction([
        this.prismaService.income.findUnique({ where: { id_income: id } }),
        this.prismaService.income.delete({ where: { id_income: id } }),
      ]);
    } catch {}

    if (!incomeExists) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "Income not found",
      });
    }

    return CoreApiResponse.success();
  }

  @Get()
  @ApiOkResponse({ type: IncomeArrayResponse })
  async findAll(
    @Query("cursor") cursor?: string,
    @Query("take") take?: string,
  ): Promise<CoreApiResponse<IncomeModel[]>> {
    const findManyArgs: Prisma.IncomeFindManyArgs = {
      orderBy: { created_at: "asc" },
    };

    if (take != null) {
      findManyArgs.take = Number(take);
    }

    if (cursor != null) {
      findManyArgs.skip = 1;
      findManyArgs.cursor = { id_income: Number(cursor) };
    }

    const foundIncomes = await this.prismaService.income.findMany(findManyArgs);

    return CoreApiResponse.success(
      foundIncomes.map((income) => this.incomeMapper.toIncomeModel(income)),
    );
  }
}
