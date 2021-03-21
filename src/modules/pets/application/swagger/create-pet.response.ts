import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PetResponse } from "./pet.response";

export class CreatePetResponse extends ApiGenericResponse(PetResponse) {}
