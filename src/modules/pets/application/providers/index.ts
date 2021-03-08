import { Provider } from "@nestjs/common";

import { TransactionalUseCaseWrapper } from "../../../../common/TransactionalUseCaseWrapper";
import {
  CREATE_PET_USE_CASE,
  FIND_ALL_PETS_USE_CASE,
  FIND_PET_BY_ID_USE_CASE,
  PETS_REPOSITORY,
} from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { CreatePetService } from "../services/create-pet.service";
import { FindAllPetsService } from "../services/find-all-pets.service";
import { FindPetByIdService } from "../services/find-by-id.service";

const providers: Provider[] = [
  {
    provide: CREATE_PET_USE_CASE,
    useFactory: (petsRepository: PetsRepository) => {
      const createPetService = new CreatePetService(petsRepository);
      return new TransactionalUseCaseWrapper(createPetService);
    },
    inject: [PETS_REPOSITORY],
  },
  {
    provide: FIND_ALL_PETS_USE_CASE,
    useFactory: (petsRepository: PetsRepository) => {
      const findAllPetsService = new FindAllPetsService(petsRepository);
      return new TransactionalUseCaseWrapper(findAllPetsService);
    },
    inject: [PETS_REPOSITORY],
  },
  {
    provide: FIND_PET_BY_ID_USE_CASE,
    useFactory: (petsRepository: PetsRepository) => {
      const findPetByIdService = new FindPetByIdService(petsRepository);
      return new TransactionalUseCaseWrapper(findPetByIdService);
    },
    inject: [PETS_REPOSITORY],
  },
];

export { providers };
