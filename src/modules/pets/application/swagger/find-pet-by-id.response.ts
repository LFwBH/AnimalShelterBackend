import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PetResponse } from "./pet.response";

export class FindPetByIdResponse extends ApiGenericResponse(PetResponse) {}
