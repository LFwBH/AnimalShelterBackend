import { ApiGenericResponse } from "../../../../common/ApiGenericResponse";
import { LocationResponse } from "./location.response";

export class FindAllLocationsResponse extends ApiGenericResponse([
  LocationResponse,
]) {}
