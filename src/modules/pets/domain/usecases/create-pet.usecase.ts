import { TransactionalUseCase } from "../../../../common/UseCase";
import { PetModel } from "../models/pet.model";
import { CreatePetPort } from "../ports/create-pet.port";

export interface CreatePetUseCase
  extends TransactionalUseCase<CreatePetPort, PetModel> {}
