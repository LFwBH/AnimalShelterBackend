import { Optional } from "../../../../common/Optional";
import { RepositoryPageOptions } from "../../../../common/RepositoryPageOptions";
import { LocationModel } from "../models/location.model";
import { CreateLocationPort } from "../ports/create-location.port";
import { UpdateLocationPort } from "../ports/update-location.port";

export interface LocationRepository {
  create(location: CreateLocationPort): Promise<LocationModel>;

  update(overrides: UpdateLocationPort): Promise<LocationModel>;

  findAll(page: RepositoryPageOptions): Promise<Iterable<LocationModel>>;

  findById(id: number): Promise<Optional<LocationModel>>;
}
