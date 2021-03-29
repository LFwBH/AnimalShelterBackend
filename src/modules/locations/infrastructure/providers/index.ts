import { Provider } from "@nestjs/common";

import { PrismaService } from "../../../../services/prisma.service";
import { LOCATION_REPOSITORY } from "../../domain/providers";
import { PrismaLocationRepository } from "../repositories/prisma-location.repository";

const providers: Provider[] = [
  PrismaService,
  {
    provide: LOCATION_REPOSITORY,
    useClass: PrismaLocationRepository,
  },
];

export { providers };
