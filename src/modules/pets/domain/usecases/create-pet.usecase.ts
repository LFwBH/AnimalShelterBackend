import { TransactionalUseCase } from "../../../../common/UseCase";
import { PetEntity } from "../../infrastructure/entities/pet.entity";
import { CreatePetPort } from "../ports/create-pet.port";

export interface CreatePetUseCase
  extends TransactionalUseCase<CreatePetPort, PetEntity> {}
