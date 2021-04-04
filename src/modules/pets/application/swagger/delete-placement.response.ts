import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PetResponse } from "./pet.response";

export class DeletePlacementResponse extends ApiGenericResponse(PetResponse) {}
