import { TransactionalUseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";
import { DeletePlacementPort } from "../ports/delete-placement.port";

export interface DeletePlacementUseCase
  extends TransactionalUseCase<DeletePlacementPort, PetModel> {}
