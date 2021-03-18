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
import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { CoreApiResponse } from "../../../../common/CoreApiResponse";
import { Optional } from "../../../../common/Optional";
import { PetModel } from "../../domain/models/pet.model";
import {
  CREATE_PET_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
  FIND_PET_BY_ID_USE_CASE,
} from "../../domain/providers";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";
import { FindPetByIdUseCase } from "../../domain/usecases/find-by-id.usecase";
import { CreatePetAdapter } from "../../infrastructure/adapters/create-pet.adapter";
import { CreatePetDto } from "../dto/create-pet.dto";
import { PetResponse } from "../swagger/PetResponse";

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
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ApiGenericResponse(PetResponse) })
  async create(@Body() body: CreatePetDto): Promise<CoreApiResponse<PetModel>> {
    const adapter = await CreatePetAdapter.new(body);
    const pet = await this.createPetUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  @Get()
  @ApiOkResponse({ type: ApiGenericResponse([PetResponse]) })
  async findAll(
    @Query("cursor") cursor?: number,
    @Query("take") take?: number,
  ): Promise<CoreApiResponse<Iterable<PetModel>>> {
    const adapter = await PageOptionsAdapter.new({
      cursor: cursor ? Number(cursor) : undefined,
      take: take ? Number(take) : undefined,
    });
    const pets = await this.findAllPetsUseCase.execute(adapter);
    return CoreApiResponse.success(pets);
  }

  @Get(":id")
  @ApiOkResponse({ type: ApiGenericResponse(PetResponse) })
  async findById(
    @Param("id") id: string,
  ): Promise<CoreApiResponse<Optional<PetModel>>> {
    const adapter = Number(id);
    const pet = await this.findPetByIdUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }
}
