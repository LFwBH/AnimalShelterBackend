import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PetResponse } from "./pet.response";

export class FindAllPetsResponse extends ApiGenericResponse([PetResponse]) {}
