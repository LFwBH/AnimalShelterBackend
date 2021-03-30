import { TransactionalUseCase } from "../../../../common/UseCase";
import { CreateUserPort } from "../ports/create-user.port";

export interface RegisterUserUseCase
  extends TransactionalUseCase<CreateUserPort, string> {}
