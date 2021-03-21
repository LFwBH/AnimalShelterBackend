import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { PlacementResponse } from "./placement.response";

export class FindAllPlacementsResponse extends ApiGenericResponse([
  PlacementResponse,
]) {}
