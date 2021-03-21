import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PlacementResponse } from "./placement.response";

export class CreatePlacementResponse extends ApiGenericResponse(
  PlacementResponse,
) {}
