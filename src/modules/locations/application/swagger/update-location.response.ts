import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { LocationResponse } from "./location.response";

export class UpdateLocationResponse extends ApiGenericResponse(
  LocationResponse,
) {}
