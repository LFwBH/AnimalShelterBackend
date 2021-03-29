import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { UseCase } from "../../../../common/UseCase";
import { LocationModel } from "../models/location.model";

export interface FindAllLocationsUseCase
  extends UseCase<RepositoryPageOptions, Iterable<LocationModel>> {}
