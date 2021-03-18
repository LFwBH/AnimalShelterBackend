import { RepositoryPageOptions } from "common/RepositoryPageOptions";

import { PlacementModel } from "../models/placement.model";

export interface PlacementRepository {
  create(placement: Partial<PlacementModel>): Promise<PlacementModel>;

  findAll(page: RepositoryPageOptions): Promise<Iterable<PlacementModel>>;
}
