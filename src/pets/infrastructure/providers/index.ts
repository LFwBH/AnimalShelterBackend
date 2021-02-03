import { Provider } from "@nestjs/common";

import { PETS_REPOSITORY } from "../../domain/providers";
import { PrismaPetsRepository } from "../repositories/prisma-pets.repository";

export const provider: Provider[] = [
  {
    provide: PETS_REPOSITORY,
    useClass: PrismaPetsRepository,
  },
];
