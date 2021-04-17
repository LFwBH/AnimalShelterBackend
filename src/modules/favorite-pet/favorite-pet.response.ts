import { ApiGenericResponse } from "../../common/ApiGenericResponse";
import { FavoritePetEntity } from "./favorite-pet.entity";

export class FavoritePetResponse extends ApiGenericResponse(
  FavoritePetEntity,
) {}

export class FavoritePetArrayResponse extends ApiGenericResponse([
  FavoritePetEntity,
]) {}

export class FavoritePetOkResponse extends ApiGenericResponse() {}
