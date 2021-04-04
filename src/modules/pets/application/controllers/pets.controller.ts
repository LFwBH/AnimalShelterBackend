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
import { PetModel } from "../../domain/models/pet.model";
import {
  ADD_PLACEMENT_USE_CASE,
  CREATE_PET_USE_CASE,
  DELETE_PLACEMENT_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
  FIND_PET_BY_ID_USE_CASE,
  UPDATE_PET_USE_CASE,
} from "../../domain/providers";
import { AddPlacementUseCase } from "../../domain/usecases/add-placement.usecase";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { DeletePlacementUseCase } from "../../domain/usecases/delete-placement.usecase";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";
import { FindPetByIdUseCase } from "../../domain/usecases/find-by-id.usecase";
import { UpdatePetUseCase } from "../../domain/usecases/update-pet.usecase";
import { AddPlacementAdapter } from "../adapters/add-placement.adapter";
import { CreatePetAdapter } from "../adapters/create-pet.adapter";
import { DeletePlacementAdapter } from "../adapters/delete-placement.adapter";
import { PetFilterAdapter } from "../adapters/pet-filter.adapter";
import { UpdatePetAdapter } from "../adapters/update-pet.adapter";
import { AddPlacementDto } from "../dto/add-placement.dto";
import { CreatePetDto } from "../dto/create-pet.dto";
import { DeletePlacementDto } from "../dto/delete-placement.dto";
import { PetFilterDto } from "../dto/pet-filter.dto";
import { UpdatePetDto } from "../dto/update-pet.dto";
import { AddPlacementResponse } from "../swagger/add-placement.response";
import { CreatePetResponse } from "../swagger/create-pet.response";
import { DeletePlacementResponse } from "../swagger/delete-placement.response";
import { FindAllPetsResponse } from "../swagger/find-all-pets.response";
import { FindPetByIdResponse } from "../swagger/find-pet-by-id.response";
import { UpdatePetResponse } from "../swagger/update-pet.response";

@ApiTags("pets")
@Controller("pets")
export class PetsController {
  constructor(
    @Inject(CREATE_PET_USE_CASE)
    private readonly createPetUseCase: CreatePetUseCase,
    @Inject(UPDATE_PET_USE_CASE)
    private readonly updatePetUseCase: UpdatePetUseCase,
    @Inject(FIND_ALL_PETS_USE_CASE)
    private readonly findAllPetsUseCase: FindAllPetsUseCase,
    @Inject(FIND_PET_BY_ID_USE_CASE)
    private readonly findPetByIdUseCase: FindPetByIdUseCase,
    @Inject(ADD_PLACEMENT_USE_CASE)
    private readonly addPlacementUseCase: AddPlacementUseCase,
    @Inject(DELETE_PLACEMENT_USE_CASE)
    private readonly deletePlacementUseCase: DeletePlacementUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CreatePetResponse })
  async create(@Body() body: CreatePetDto): Promise<CoreApiResponse<PetModel>> {
    const adapter = await CreatePetAdapter.new(body);
    const pet = await this.createPetUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  @Patch(":id")
  @ApiOkResponse({ type: UpdatePetResponse })
  async update(
    @Body() body: UpdatePetDto,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<PetModel>> {
    const adapter = await UpdatePetAdapter.new({ ...body, id });
    const pet = await this.updatePetUseCase.execute(adapter);
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

  @Delete("/placement")
  @ApiOkResponse({ type: DeletePlacementResponse })
  async deletePlacement(
    @Body() body: DeletePlacementDto,
  ): Promise<CoreApiResponse<PetModel>> {
    const adapter = await DeletePlacementAdapter.new(body);
    const pet = await this.deletePlacementUseCase.execute(adapter);
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
    @Param("id", ParseIntPipe) id: number,
  ): Promise<CoreApiResponse<Optional<PetModel>>> {
    const pet = await this.findPetByIdUseCase.execute(id);
    return CoreApiResponse.success(pet);
  }
}
