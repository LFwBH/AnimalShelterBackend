import { TransactionalUseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";
import { UpdatePetPort } from "../ports/update-pet.port";

export interface UpdatePetUseCase
  extends TransactionalUseCase<UpdatePetPort, PetModel> {}
