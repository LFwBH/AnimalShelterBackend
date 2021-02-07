import { Body, Controller, Inject, Post } from "@nestjs/common";

import { CoreApiResponse } from "../../../common/CoreApiResponse";
import { CREATE_PET_USE_CASE } from "../../domain/providers";
import { CreatePetUseCase } from "../../domain/usecases/create-pet.usecase";
import { CreatePetAdapter } from "../../infrastructure/adapters/create-pet.adapter";
import { CreatePetDto } from "../dto/create-pet.dto";

@Controller("pets")
export class PetsController {
  constructor(
    @Inject(CREATE_PET_USE_CASE)
    private readonly createPetUseCase: CreatePetUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreatePetDto) {
    const adapter = await CreatePetAdapter.new(body);
    const pet = await this.createPetUseCase.execute(adapter);
    return CoreApiResponse.success(pet);
  }

  // @Get()
  // findAll() {
  //   return this.createPetService.findAll();
  // }

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
