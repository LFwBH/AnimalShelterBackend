import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { PageOptionsAdapter } from "../../../../adapters/page-options.adapter";
import { CoreApiResponse } from "../../../../common/CoreApiResponse";
import { Optional } from "../../../../common/Optional";
import { PetModel } from "../../domain/models/pet.model";
import {
  ADD_PLACEMENT_USE_CASE,
  CREATE_PET_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
  FIND_PET_BY_ID_USE_CASE,
} from "../../domain/providers";
import { AddPlacementUseCase } from "../../domain/usecases/add-placement.usecase";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";
import { FindPetByIdUseCase } from "../../domain/usecases/find-by-id.usecase";
import { AddPlacementAdapter } from "../adapters/add-placement.adapter";
import { CreatePetAdapter } from "../adapters/create-pet.adapter";
import { PetFilterAdapter } from "../adapters/pet-filter.adapter";
import { AddPlacementDto } from "../dto/add-placement.dto";
import { CreatePetDto } from "../dto/create-pet.dto";
import { PetFilterDto } from "../dto/pet-filter.dto";
import { AddPlacementResponse } from "../swagger/add-placement.response";
import { CreatePetResponse } from "../swagger/create-pet.response";
import { FindAllPetsResponse } from "../swagger/find-all-pets.response";
import { FindPetByIdResponse } from "../swagger/find-pet-by-id.response";

@ApiTags("pets")
@Controller("pets")
export class PetsController {
  constructor(
    @Inject(CREATE_PET_USE_CASE)
    private readonly createPetUseCase: CreatePetUseCase,
    @Inject(FIND_ALL_PETS_USE_CASE)
    private readonly findAllPetsUseCase: FindAllPetsUseCase,
    @Inject(FIND_PET_BY_ID_USE_CASE)
    private readonly findPetByIdUseCase: FindPetByIdUseCase,
    @Inject(ADD_PLACEMENT_USE_CASE)
    private readonly addPlacementUseCase: AddPlacementUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePetResponse })
  async create(@Body() body: CreatePetDto): Promise<CoreApiResponse<PetModel>> {
    const adapter = await CreatePetAdapter.new(body);
    const pet = await this.createPetUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  @Post("/placement")
  @ApiCreatedResponse({ type: AddPlacementResponse })
  async addPlacement(
    @Body() body: AddPlacementDto,
  ): Promise<CoreApiResponse<PetModel>> {
    const adapter = await AddPlacementAdapter.new(body);
    const pet = await this.addPlacementUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  @Get()
  @ApiOkResponse({ type: FindAllPetsResponse })
  async findAll(
    @Query("cursor") cursor?: number,
    @Query("take") take?: number,
    @Query("filter") filter?: PetFilterDto,
  ): Promise<CoreApiResponse<Iterable<PetModel>>> {
    const pageOptionsAdapter = await PageOptionsAdapter.new({
      cursor: cursor ? Number(cursor) : undefined,
      take: take ? Number(take) : undefined,
    });

    let filterOptionsAdapter: Optional<PetFilterAdapter>;

    if (filter) {
      filterOptionsAdapter = await PetFilterAdapter.new(filter);
    }

    const pets = await this.findAllPetsUseCase.execute({
      ...pageOptionsAdapter,
      filter: filterOptionsAdapter,
    });
    return CoreApiResponse.success(pets);
  }

  @Get(":id")
  @ApiOkResponse({ type: FindPetByIdResponse })
  async findById(
    @Param("id") id: string,
  ): Promise<CoreApiResponse<Optional<PetModel>>> {
    const adapter = Number(id);
    const pet = await this.findPetByIdUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }
}
