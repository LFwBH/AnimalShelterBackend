import { TransactionalUseCase } from "../../../../common/UseCase";
import { LocationModel } from "../models/location.model";
import { UpdateLocationPort } from "../ports/update-location.port";

export interface UpdateLocationUseCase
  extends TransactionalUseCase<UpdateLocationPort, LocationModel> {}
