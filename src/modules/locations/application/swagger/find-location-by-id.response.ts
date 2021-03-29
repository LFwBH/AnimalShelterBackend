import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { LocationResponse } from "./location.response";

export class FindLocationByIdResponse extends ApiGenericResponse(
  LocationResponse,
) {}
