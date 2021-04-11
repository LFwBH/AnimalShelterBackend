import { Provider } from "@nestjs/common";

import { CryptoService } from "../../../../common/CryptoService";
import { TokenService } from "../../../../common/TokenService";
import { TransactionalUseCaseWrapper } from "../../../../common/TransactionalUseCaseWrapper";
import { CRYPTO_SERVICE, TOKEN_SERVICE } from "../../../../providers";
import { PrismaService } from "../../../../services/prisma.service";
import {
  LOGIN_USER_USE_CASE,
  REGISTER_USER_USE_CASE,
  USER_REPOSITORY,
} from "../../domain/providers";
import { UserRepository } from "../../domain/repositories/user.repository";
import { LoginUserService } from "../services/login-user.service";
import { RegisterUserService } from "../services/register-user.service";
import { JwtStrategy } from "../strategies/jwt.strategy";

const providers: Provider[] = [
  JwtStrategy,
  {
    provide: REGISTER_USER_USE_CASE,
    useFactory: (
      userRepository: UserRepository,
      cryptoService: CryptoService,
      tokenService: TokenService,
      prismaService: PrismaService,
    ) => {
      const registerUserService = new RegisterUserService(
        userRepository,
        cryptoService,
        tokenService,
      );

      return new TransactionalUseCaseWrapper(
        registerUserService,
        prismaService,
      );
    },
    inject: [USER_REPOSITORY, CRYPTO_SERVICE, TOKEN_SERVICE, PrismaService],
  },
  {
    provide: LOGIN_USER_USE_CASE,
    useFactory: (
      userRepository: UserRepository,
      tokenService: TokenService,
      cryptoService: CryptoService,
      prismaService: PrismaService,
    ) => {
      const loginUserService = new LoginUserService(
        userRepository,
        tokenService,
        cryptoService,
      );

      return new TransactionalUseCaseWrapper(loginUserService, prismaService);
    },
    inject: [USER_REPOSITORY, TOKEN_SERVICE, CRYPTO_SERVICE, PrismaService],
  },
];

export { providers };
