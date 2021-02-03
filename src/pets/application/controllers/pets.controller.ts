import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";

import { PETS_SERVICE } from "../../domain/providers";
import { PetsUseCase } from "../../domain/usecases/pets.usecase";
import { CreatePetDto } from "../dto/create-pet.dto";
import { UpdatePetDto } from "../dto/update-pet.dto";

@Controller("pets")
export class PetsController {
  constructor(
    @Inject(PETS_SERVICE) private readonly petsService: PetsUseCase,
  ) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    const pet = CreatePetDto.toPet(createPetDto);
    return this.petsService.create(pet);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.petsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePetDto: UpdatePetDto) {
    const pet = UpdatePetDto.toPet(updatePetDto);
    return this.petsService.update(+id, pet);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.petsService.remove(+id);
  }
}
