import { UseCase } from "../../../../common/UseCase";
import { FindUserByEmailPort } from "../ports/find-user-by-email.port";

export interface LoginUserUseCase
  extends UseCase<FindUserByEmailPort, string> {}
