import { ApiGenericResponse } from "../../common/ApiGenericResponse";
import { IncomeEntity } from "./income.entity";

export class IncomeResponse extends ApiGenericResponse(IncomeEntity) {}

export class IncomeArrayResponse extends ApiGenericResponse([IncomeEntity]) {}

export class IncomeOkResponse extends ApiGenericResponse() {}
