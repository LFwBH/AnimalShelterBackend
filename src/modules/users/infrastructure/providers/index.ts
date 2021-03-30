import { Provider } from "@nestjs/common";

import { CRYPTO_SERVICE, TOKEN_SERVICE } from "../../../../providers";
import { Argon2Service } from "../../../../services/argon2.service";
import { JwtService } from "../../../../services/jwt.service";
import { PrismaService } from "../../../../services/prisma.service";
import { USER_REPOSITORY } from "../../domain/providers";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";

const providers: Provider[] = [
  PrismaService,
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
  {
    provide: CRYPTO_SERVICE,
    useClass: Argon2Service,
  },
  {
    provide: TOKEN_SERVICE,
    useClass: JwtService,
  },
];

export { providers };
