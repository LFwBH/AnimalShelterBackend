import { TransactionalUseCase } from "../../../common/UseCase";
import { Pet } from "../entities/pet.entity";
import { CreatePetPort } from "../ports/create-pet.port";

export interface CreatePetUseCase
  extends TransactionalUseCase<CreatePetPort, Pet> {}
