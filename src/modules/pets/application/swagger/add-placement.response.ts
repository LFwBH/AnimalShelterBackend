import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PetResponse } from "./pet.response";

export class AddPlacementResponse extends ApiGenericResponse(PetResponse) {}
