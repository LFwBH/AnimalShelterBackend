import { Provider } from "@nestjs/common";

import { PrismaService } from "../../../../services/prisma.service";
import { PETS_REPOSITORY } from "../../domain/providers";
import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";

const providers: Provider[] = [
  PrismaService,
  {
    provide: PETS_REPOSITORY,
    useClass: PrismaPetsRepository,
  },
];

export { providers };
