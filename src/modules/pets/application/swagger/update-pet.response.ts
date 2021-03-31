import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PetResponse } from "./pet.response";

export class UpdatePetResponse extends ApiGenericResponse(PetResponse) {}
