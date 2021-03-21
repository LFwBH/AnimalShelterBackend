import { Provider } from "@nestjs/common";

import { TransactionalUseCaseWrapper } from "../../../../common/TransactionalUseCaseWrapper";
import { PrismaService } from "../../../../services/prisma.service";
import {
  CREATE_PLACEMENT_USE_CASE,
  FIND_ALL_PLACEMENTS_USE_CASE,
  PLACEMENTS_REPOSITORY,
} from "../../domain/providers";
import { PlacementRepository } from "../../domain/repositories/placement.repository";
import { CreatePlacementService } from "../services/create-placement.service";
import { FindAllPlacementsService } from "../services/find-all-placements.service";

const providers: Provider[] = [
  {
    provide: CREATE_PLACEMENT_USE_CASE,
    useFactory: (
      placementRepository: PlacementRepository,
      prismaService: PrismaService,
    ) => {
      const createPlacementService = new CreatePlacementService(
        placementRepository,
      );
      return new TransactionalUseCaseWrapper(
        createPlacementService,
        prismaService,
      );
    },
    inject: [PLACEMENTS_REPOSITORY, PrismaService],
  },
  {
    provide: FIND_ALL_PLACEMENTS_USE_CASE,
    useClass: FindAllPlacementsService,
  },
];

export { providers };
