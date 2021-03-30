import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { CoreApiResponse } from "../../../../common/CoreApiResponse";
import {
  LOGIN_USER_USE_CASE,
  REGISTER_USER_USE_CASE,
} from "../../domain/providers";
import { LoginUserUseCase } from "../../domain/usecases/login-user.usecase";
import { RegisterUserUseCase } from "../../domain/usecases/register-user.usecase";
import { LoginUserAdapter } from "../adapters/login-user.adapter";
import { RegisterUserAdapter } from "../adapters/register-user.adapter";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";
import { AuthResponse } from "../swagger/auth.response";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject(REGISTER_USER_USE_CASE)
    private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject(LOGIN_USER_USE_CASE)
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post("register")
  @ApiCreatedResponse({ type: ApiGenericResponse(AuthResponse) })
  async register(
    @Body() body: RegisterUserDto,
  ): Promise<CoreApiResponse<AuthResponse>> {
    const adapter = await RegisterUserAdapter.new(body);
    const token = await this.registerUserUseCase.execute(adapter);
    return CoreApiResponse.success({ token });
  }

  @Post("login")
  @ApiOkResponse({ type: ApiGenericResponse(AuthResponse) })
  async login(
    @Body() body: LoginUserDto,
  ): Promise<CoreApiResponse<AuthResponse>> {
    const adapter = await LoginUserAdapter.new(body);
    const token = await this.loginUserUseCase.execute(adapter);
    return CoreApiResponse.success({ token });
  }
}
