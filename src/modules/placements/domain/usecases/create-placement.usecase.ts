import { TransactionalUseCase } from "../../../../common/UseCase";
import { PlacementModel } from "../models/placement.model";
import { CreatePlacementPort } from "../ports/create-placement.port";

export interface CreatePlacementUseCase
  extends TransactionalUseCase<CreatePlacementPort, PlacementModel> {}
