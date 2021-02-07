import { Body, Controller, Get, Inject, Post } from "@nestjs/common";

import { CoreApiResponse } from "../../../common/CoreApiResponse";
import { Pet } from "../../domain/entities/pet.entity";
import {
  CREATE_PET_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
} from "../../domain/providers";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { FindAllPetsUseCase } from "../../domain/usecases/find-all-pets.usecase";
import { CreatePetAdapter } from "../../infrastructure/adapters/create-pet.adapter";
import { CreatePetDto } from "../dto/create-pet.dto";

@Controller("pets")
export class PetsController {
  constructor(
    @Inject(CREATE_PET_USE_CASE)
    private readonly createPetUseCase: CreatePetUseCase,
    @Inject(FIND_ALL_PETS_USE_CASE)
    private readonly findAllPetsUseCase: FindAllPetsUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreatePetDto): Promise<CoreApiResponse<Pet>> {
    const adapter = await CreatePetAdapter.new(body);
    const pet = await this.createPetUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  @Get()
  async findAll(): Promise<CoreApiResponse<Iterable<Pet>>> {
    const pets = await this.findAllPetsUseCase.execute();
    return CoreApiResponse.success(pets);
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.createPetService.findOne(+id);
  // }

  // @Put(":id")
  // update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
  //   const pet = UpdatePetDto.toPet(updatePetDto);
  //   return this.createPetService.update(+id, pet);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.createPetService.remove(+id);
  // }
}
