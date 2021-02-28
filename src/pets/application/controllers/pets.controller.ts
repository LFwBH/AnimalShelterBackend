import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiGenericResponse } from "../../../common/ApiGenericResponse";
import { CoreApiResponse } from "../../../common/CoreApiResponse";
import { Pet } from "../../domain/entities/pet.entity";
import {
  CREATE_PET_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
} from "../../domain/providers";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";
import { CreatePetAdapter } from "../../infrastructure/adapters/create-pet.adapter";
import { FindAllPetsAdapter } from "../../infrastructure/adapters/find-all-pets.adapter";
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
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ApiGenericResponse(PetResponse) })
  async create(@Body() body: CreatePetDto): Promise<CoreApiResponse<Pet>> {
    const adapter = await CreatePetAdapter.new(body);
    const pet = await this.createPetUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  @Get()
  @ApiOkResponse({ type: ApiGenericResponse([PetResponse]) })
  async findAll(
    @Query("cursor") cursor: number,
    @Query("take") take: number,
  ): Promise<CoreApiResponse<Iterable<Pet>>> {
    const adapter = await FindAllPetsAdapter.new({
      cursor: cursor ? Number(cursor) : undefined,
      take: take ? Number(take) : undefined,
    });
    const pets = await this.findAllPetsUseCase.execute(adapter);
    return CoreApiResponse.success(pets);
  }
}
