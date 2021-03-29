import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { LocationResponse } from "./location.response";

export class CreateLocationResponse extends ApiGenericResponse(
  LocationResponse,
) {}
