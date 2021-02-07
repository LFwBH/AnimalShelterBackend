import { UseCase } from "../../../common/UseCase";
import { Pet } from "../entities/pet.entity";

export interface FindAllPetsUseCase extends UseCase<void, Iterable<Pet>> {}
