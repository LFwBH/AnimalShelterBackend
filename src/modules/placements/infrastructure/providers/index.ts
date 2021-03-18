import { Provider } from "@nestjs/common";

import { PrismaService } from "../../../../services/prisma.service";
import { PLACEMENTS_REPOSITORY } from "../../domain/providers";
import { PrismaPlacementRepository } from "../repositories/prisma-placement.repository";

const providers: Provider[] = [
  PrismaService,
  {
    provide: PLACEMENTS_REPOSITORY,
    useClass: PrismaPlacementRepository,
  },
];

export { providers };
