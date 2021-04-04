import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { PageOptionsAdapter } from "../../../../adapters/page-options.adapter";
import { CoreApiResponse } from "../../../../common/CoreApiResponse";
import { Optional } from "../../../../common/Optional";
import { LocationModel } from "../../domain/models/location.model";
import {
  CREATE_LOCATION_USE_CASE,
  DELETE_LOCATION_USE_CASE,
  FIND_ALL_LOCATIONS_USE_CASE,
  FIND_LOCATION_BY_ID_USE_CASE,
  UPDATE_LOCATION_USE_CASE,
} from "../../domain/providers";
import { CreateLocationUseCase } from "../../domain/usecases/create-location.usecase";
import { DeleteLocationUseCase } from "../../domain/usecases/delete-location.usecase";
import { FindAllLocationsUseCase } from "../../domain/usecases/find-all-locations.usecase";
import { FindLocationByIdUseCase } from "../../domain/usecases/find-location-by-id.usecase";
import { UpdateLocationUseCase } from "../../domain/usecases/update-location.usecase";
import { CreateLocationAdapter } from "../adapters/create-location.adapter";
import { UpdateLocationAdapter } from "../adapters/update-location.adapter";
import { CreateLocationDto } from "../dto/create-location.dto";
import { UpdateLocationDto } from "../dto/update-location.dto";
import { CreateLocationResponse } from "../swagger/create-location.response";
import { DeleteLocationResponse } from "../swagger/delete-location.response";
import { FindAllLocationsResponse } from "../swagger/find-all-locations.response";
import { FindLocationByIdResponse } from "../swagger/find-location-by-id.response";
import { UpdateLocationResponse } from "../swagger/update-location.response";

@ApiTags("locations")
@Controller("locations")
export class LocationController {
  constructor(
    @Inject(CREATE_LOCATION_USE_CASE)
    private readonly createLocationUseCase: CreateLocationUseCase,
    @Inject(UPDATE_LOCATION_USE_CASE)
    private readonly updateLocationUseCase: UpdateLocationUseCase,
    @Inject(FIND_LOCATION_BY_ID_USE_CASE)
    private readonly findLocationByIdUseCase: FindLocationByIdUseCase,
    @Inject(FIND_ALL_LOCATIONS_USE_CASE)
    private readonly findAllLocationsUseCase: FindAllLocationsUseCase,
    @Inject(DELETE_LOCATION_USE_CASE)
    private readonly deleteLocationUseCase: DeleteLocationUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreateLocationResponse })
  async create(
    @Body() body: CreateLocationDto,
  ): Promise<CoreApiResponse<LocationModel>> {
    const adapter = await CreateLocationAdapter.new(body);
    const location = await this.createLocationUseCase.execute(adapter);
    return CoreApiResponse.success(location);
  }

  @Patch(":id")
  @ApiCreatedResponse({ type: UpdateLocationResponse })
  async update(
    @Body() body: UpdateLocationDto,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<LocationModel>> {
    const adapter = await UpdateLocationAdapter.new({ ...body, id });
    const location = await this.updateLocationUseCase.execute(adapter);
    return CoreApiResponse.success(location);
  }

  @Delete(":id")
  @ApiOkResponse({ type: DeleteLocationResponse })
  async delete(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<void>> {
    await this.deleteLocationUseCase.execute(id);
    return CoreApiResponse.success();
  }

  @Get()
  @ApiOkResponse({ type: FindAllLocationsResponse })
  async findAll(
    @Query("cursor") cursor?: string,
    @Query("take") take?: string,
  ): Promise<CoreApiResponse<Iterable<LocationModel>>> {
    const adapter = await PageOptionsAdapter.new({
      cursor: cursor ? Number(cursor) : undefined,
      take: take ? Number(take) : undefined,
    });
    const placements = await this.findAllLocationsUseCase.execute(adapter);
    return CoreApiResponse.success(placements);
  }

  @Get(":id")
  @ApiOkResponse({ type: FindLocationByIdResponse })
  async findById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<Optional<LocationModel>>> {
    const pet = await this.findLocationByIdUseCase.execute(id);
    return CoreApiResponse.success(pet);
  }
}
