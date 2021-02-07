import { Provider } from "@nestjs/common";

import { TransactionalUseCaseWrapper } from "../../../common/TransactionalUseCaseWrapper";
import { PrismaService } from "../../../services/prisma.service";
import { CREATE_PET_USE_CASE, PETS_REPOSITORY } from "../../domain/providers";
import { PetsRepository } from "../../domain/repositories/pets.repository";
import { CreatePetService } from "../services/create-pet.service";

const providers: Provider[] = [
  {
    provide: CREATE_PET_USE_CASE,
    useFactory: (
      prismaService: PrismaService,
      petsRepository: PetsRepository,
    ) => {
      const createPetService = new CreatePetService(petsRepository);
      return new TransactionalUseCaseWrapper(prismaService, createPetService);
    },
    inject: [PrismaService, PETS_REPOSITORY],
  },
];

export { providers };
