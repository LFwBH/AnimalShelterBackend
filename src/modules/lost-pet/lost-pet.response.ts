import { ApiGenericResponse } from "../../common/ApiGenericResponse";
import { LostPetEntity } from "./lost-pet.entity";

export class LostPetResponse extends ApiGenericResponse(LostPetEntity) {}

export class LostPetArrayResponse extends ApiGenericResponse([LostPetEntity]) {}
