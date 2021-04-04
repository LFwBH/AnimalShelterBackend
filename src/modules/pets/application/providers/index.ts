import { Provider } from "@nestjs/common";

import { TransactionalUseCaseWrapper } from "../../../../common/TransactionalUseCaseWrapper";
import { PrismaService } from "../../../../services/prisma.service";
import { PlacementRepositoryAdapter } from "../../../placements/application/adapters/placement-repository.adapter";
import {
  ADD_PLACEMENT_USE_CASE,
  CREATE_PET_USE_CASE,
  DELETE_PLACEMENT_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
  FIND_PET_BY_ID_USE_CASE,
  PETS_REPOSITORY,
  PLACEMENTS_REPOSITORY,
  UPDATE_PET_USE_CASE,
} from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { AddPlacementService } from "../services/add-placement.service";
import { CreatePetService } from "../services/create-pet.service";
import { DeletePlacementService } from "../services/delete-placement.service";
import { FindAllPetsService } from "../services/find-all-pets.service";
import { FindPetByIdService } from "../services/find-pet-by-id.service";
import { UpdatePetService } from "../services/update-pet.service";

const providers: Provider[] = [
  {
    provide: CREATE_PET_USE_CASE,
    useFactory: (
      petsRepository: PetsRepository,
      prismaService: PrismaService,
    ) => {
      const createPetService = new CreatePetService(petsRepository);
      return new TransactionalUseCaseWrapper(createPetService, prismaService);
    },
    inject: [PETS_REPOSITORY, PrismaService],
  },
  {
    provide: UPDATE_PET_USE_CASE,
    useFactory: (
      petsRepository: PetsRepository,
      prismaService: PrismaService,
    ) => {
      const updatePetService = new UpdatePetService(petsRepository);
      return new TransactionalUseCaseWrapper(updatePetService, prismaService);
    },
    inject: [PETS_REPOSITORY, PrismaService],
  },
  {
    provide: ADD_PLACEMENT_USE_CASE,
    useFactory: (
      petsRepository: PetsRepository,
      placementRepository: PlacementRepositoryAdapter,
      prismaService: PrismaService,
    ) => {
      const addPlacementService = new AddPlacementService(
        petsRepository,
        placementRepository,
      );
      return new TransactionalUseCaseWrapper(
        addPlacementService,
        prismaService,
      );
    },
    inject: [PETS_REPOSITORY, PLACEMENTS_REPOSITORY, PrismaService],
  },
  {
    provide: DELETE_PLACEMENT_USE_CASE,
    useFactory: (
      petsRepository: PetsRepository,
      placementRepository: PlacementRepositoryAdapter,
      prismaService: PrismaService,
    ) => {
      const deletePlacementService = new DeletePlacementService(
        petsRepository,
        placementRepository,
      );
      return new TransactionalUseCaseWrapper(
        deletePlacementService,
        prismaService,
      );
    },
    inject: [PETS_REPOSITORY, PLACEMENTS_REPOSITORY, PrismaService],
  },
  {
    provide: FIND_ALL_PETS_USE_CASE,
    useClass: FindAllPetsService,
  },
  {
    provide: FIND_PET_BY_ID_USE_CASE,
    useClass: FindPetByIdService,
  },
  {
    provide: PLACEMENTS_REPOSITORY,
    useClass: PlacementRepositoryAdapter,
  },
];

export { providers };
