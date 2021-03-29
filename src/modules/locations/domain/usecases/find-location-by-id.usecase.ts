import { Optional } from "../../../../common/Optional";
import { UseCase } from "../../../../common/UseCase";
import { LocationModel } from "../models/location.model";

export interface FindLocationByIdUseCase
  extends UseCase<number, Optional<LocationModel>> {}
