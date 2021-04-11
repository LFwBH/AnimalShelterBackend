import { classToPlain } from "class-transformer";

import { Code } from "../../../../common/Code";
import { CryptoService } from "../../../../common/CryptoService";
import { Exception } from "../../../../common/Exception";
import { TokenService } from "../../../../common/TokenService";
import { FindUserByEmailPort } from "../../domain/ports/find-user-by-email.port";
import { UserRepository } from "../../domain/repositories/user.repository";
import { LoginUserUseCase } from "../../domain/usecases/login-user.usecase";

export class LoginUserService implements LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(port: FindUserByEmailPort): Promise<string> {
    const user = await this.userRepository.findByEmail(port);

    if (!user) {
      throw Exception.new({
        code: Code.ENTITY_NOT_FOUND_ERROR,
        message: "User not found",
      });
    }

    if (!(await this.cryptoService.verify(user.password, port.password))) {
      throw Exception.new({
        code: Code.UNAUTHORIZED_ERROR,
        message: "Invalid email or password",
      });
    }

    const userPayload = classToPlain(user);

    return this.tokenService.sign(userPayload);
  }
}
