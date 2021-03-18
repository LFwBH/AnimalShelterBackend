import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { UseCase } from "../../../../common/UseCase";
import { PlacementModel } from "../models/placement.model";

export interface FindAllPlacementsUseCase
  extends UseCase<RepositoryPageOptions, Iterable<PlacementModel>> {}
