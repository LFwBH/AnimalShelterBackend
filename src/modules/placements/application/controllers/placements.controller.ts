import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { PageOptionsAdapter } from "../../../../adapters/page-options.adapter";
import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { CoreApiResponse } from "../../../../common/CoreApiResponse";
import { PlacementModel } from "../../domain/models/placement.model";
import {
  CREATE_PLACEMENT_USE_CASE,
  FIND_ALL_PLACEMENTS_USE_CASE,
} from "../../domain/providers";
import { CreatePlacementUseCase } from "../../domain/usecases/create-placement.usecase";
import { FindAllPlacementsUseCase } from "../../domain/usecases/find-all-placements.usecase";
import { CreatePlacementAdapter } from "../../infrastructure/adapters/create-placement.adapter";
import { CreatePlacementDto } from "../dto/create-placement.dto";
import { PlacementResponse } from "../swagger/PlacementResponse";

@ApiTags("placements")
@Controller("placements")
export class PlacementsController {
  constructor(
    @Inject(CREATE_PLACEMENT_USE_CASE)
    private readonly createPlacementUseCase: CreatePlacementUseCase,
    @Inject(FIND_ALL_PLACEMENTS_USE_CASE)
    private readonly findAllPlacementsUseCase: FindAllPlacementsUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ApiGenericResponse(PlacementResponse) })
  async create(
    @Body() body: CreatePlacementDto,
  ): Promise<CoreApiResponse<PlacementModel>> {
    const adapter = await CreatePlacementAdapter.new(body);
    const placement = await this.createPlacementUseCase.execute(adapter);
    return CoreApiResponse.success(placement);
  }

  @Get()
  @ApiOkResponse({ type: ApiGenericResponse([PlacementResponse]) })
  async findAll(
    @Query("cursor") cursor?: number,
    @Query("take") take?: number,
  ): Promise<CoreApiResponse<Iterable<PlacementModel>>> {
    const adapter = await PageOptionsAdapter.new({
      cursor: cursor ? Number(cursor) : undefined,
      take: take ? Number(take) : undefined,
    });
    const placements = await this.findAllPlacementsUseCase.execute(adapter);
    return CoreApiResponse.success(placements);
  }
}