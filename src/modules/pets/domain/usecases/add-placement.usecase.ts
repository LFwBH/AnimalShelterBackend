import { TransactionalUseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";
import { AddPlacementPort } from "../ports/add-placement.port";

export interface AddPlacementUseCase
  extends TransactionalUseCase<AddPlacementPort, PetModel> {}
