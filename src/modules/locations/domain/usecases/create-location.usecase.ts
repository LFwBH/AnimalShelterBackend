import { TransactionalUseCase } from "../../../../common/UseCase";
import { LocationModel } from "../models/location.model";
import { CreateLocationPort } from "../ports/create-location.port";

export interface CreateLocationUseCase
  extends TransactionalUseCase<CreateLocationPort, LocationModel> {}
