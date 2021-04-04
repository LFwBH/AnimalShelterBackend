import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { PageOptionsAdapter } from "../../../../adapters/page-options.adapter";
import { CoreApiResponse } from "../../../../common/CoreApiResponse";
import { PlacementModel } from "../../domain/models/placement.model";
import {
  CREATE_PLACEMENT_USE_CASE,
  DELETE_PLACEMENT_USE_CASE,
  FIND_ALL_PLACEMENTS_USE_CASE,
} from "../../domain/providers";
import { CreatePlacementUseCase } from "../../domain/usecases/create-placement.usecase";
import { DeletePlacementUseCase } from "../../domain/usecases/delete-placement.usecase";
import { FindAllPlacementsUseCase } from "../../domain/usecases/find-all-placements.usecase";
import { CreatePlacementAdapter } from "../adapters/create-placement.adapter";
import { CreatePlacementDto } from "../dto/create-placement.dto";
import { CreatePlacementResponse } from "../swagger/create-placement.response";
import { DeletePlacementResponse } from "../swagger/delete-placement.response";
import { FindAllPlacementsResponse } from "../swagger/find-all-placements.response";

@ApiTags("placements")
@Controller("placements")
export class PlacementsController {
  constructor(
    @Inject(CREATE_PLACEMENT_USE_CASE)
    private readonly createPlacementUseCase: CreatePlacementUseCase,
    @Inject(FIND_ALL_PLACEMENTS_USE_CASE)
    private readonly findAllPlacementsUseCase: FindAllPlacementsUseCase,
    @Inject(DELETE_PLACEMENT_USE_CASE)
    private readonly deletePlacementUseCase: DeletePlacementUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePlacementResponse })
  async create(
    @Body() body: CreatePlacementDto,
  ): Promise<CoreApiResponse<PlacementModel>> {
    const adapter = await CreatePlacementAdapter.new(body);
    const placement = await this.createPlacementUseCase.execute(adapter);
    return CoreApiResponse.success(placement);
  }

  @Delete(":id")
  @ApiOkResponse({ type: DeletePlacementResponse })
  async delete(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<void>> {
    await this.deletePlacementUseCase.execute(id);
    return CoreApiResponse.success();
  }

  @Get()
  @ApiOkResponse({ type: FindAllPlacementsResponse })
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
