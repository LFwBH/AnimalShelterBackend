import { Injectable } from "@nestjs/common";
import { classToPlain } from "class-transformer";

import { Code } from "../../../../common/Code";
import { CryptoService } from "../../../../common/CryptoService";
import { Exception } from "../../../../common/Exception";
import { TokenService } from "../../../../common/TokenService";
import { CreateUserPort } from "../../domain/ports/create-user.port";
import { UserRepository } from "../../domain/repositories/user.repository";
import { RegisterUserUseCase } from "../../domain/usecases/register-user.usecase";

@Injectable()
export class RegisterUserService implements RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(port: CreateUserPort): Promise<string> {
    const userExists = await this.userRepository.findByEmail(port);

    if (userExists) {
      throw Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        message: "User with this email already exists",
      });
    }

    const passwordHash = await this.cryptoService.hash(port.password);

    const passwordHashPort: CreateUserPort = {
      ...port,
      password: passwordHash,
    };

    const user = await this.userRepository.create(passwordHashPort);

    const userPayload = classToPlain(user);

    return this.tokenService.sign(userPayload);
  }
}
